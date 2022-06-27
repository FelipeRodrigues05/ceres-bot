const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
cooldowns = {}

module.exports = {
  name: "Steal",
  aliases: ['roubar', 'steal'],

  run: async (discordClient, message, args) => {
    if (!cooldowns[message.author.id]) cooldowns[message.author.id] = { lastCMD: null }
    let lastCommand = cooldowns[message.author.id].lastCMD
    let timeout = ms("10m")
    if (lastCommand !== null && timeout - (Date.now() - lastCommand) > 0) {
      let time = ms(timeout - (Date.now() - lastCommand))
      let remnant = [time.seconds, 'segundos']
      if (remnant[0] === 0) remnant['alguns', 'milisegundos']
      if (remnant[0] === 1) remnant[time.seconds, 'segundo']

      let remainingTimeEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("❌ | Ação em Cooldown")
        .setDescription(`Ops! Parece que a ação que está tentando fazer ainda está em cooldown\nFalta isso aqui de tempo *${time}*`)
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
        .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

      message.reply({ embeds: [remainingTimeEmbed], ephemeral: true })
    }

    let user = message.mentions.users.first()
    if (!user) return message.reply({ content: 'Você precisa mencionar um usuário', ephemeral: true })
    if (user == message.author) return message.reply({ content: 'Você não pode roubar a si mesmo', ephemeral: true })

    let handMoney = await db.get(`hand_money_${user.id}`)
    if(handMoney == 0) return message.reply({ content: 'O usuário não possui dinheiro suficiente para que seja roubado', ephemeral: true })
    let robbedMoney = Math.ceil(Math.random() * handMoney)

    const formattedMoneyValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
      maximumSignificantDigits: 2
    })

    let successEmbed = new MessageEmbed()
    .setColor("GOLD")
    .setTitle("✅ | Ladrão")
    .setDescription(`Você roubou <@${user.id}>`)
    .addField(`💰 Dinheiro Roubado`, `\`\`\`js\n${formattedMoneyValue.format(robbedMoney)}\`\`\`` )
    .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
    .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    message.reply({ embeds: [successEmbed] }).then(async () => {
      await db.sub(`hand_money_${user.id}`, robbedMoney)
      await db.add(`hand_money_${message.author.id}`, robbedMoney)
    })
  }
}