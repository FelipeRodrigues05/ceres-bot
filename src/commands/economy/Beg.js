const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
cooldowns = {}

module.exports = {
  name: "Beg",
  aliases: ['mendigar'],

  run: async (discordClient, message, args) => {
    
    if (!cooldowns[message.author.id]) cooldowns[message.author.id] = { lastCMD: null }
    let lastCommand = cooldowns[message.author.id].lastCMD
    let timeout = ms("5m")
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

    const formattedMoneyValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
      maximumSignificantDigits: 2
    })

    let begMoney = Math.ceil(Math.random() * 5000)
    let successEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("✅ | mendigo(a)")
      .setDescription(`Você pediu dinheiro no farol e ganhou`)
      .addField({ name: `💰 Esmola Ganha`, value: `\`\`\`js\n${formattedMoneyValue.format(begMoney)}\`\`\`` })
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    message.reply({ embeds: [successEmbed] }).then((err) => {
      if(err) return message.reply({ content: `Houve algum erro ao adicionar o dinheiro à sua conta`, ephemeral: true })
      console.error(err);

      db.add(`hand_money_${message.author.id}`, begMoney)
    })
  }
}