const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
cooldowns = {}

module.exports = {
  name: "Work",
  aliases: ['trabalhar', 'work'],

  run: async (discordClient, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = "ce!"
  
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
    let hasWorkEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle("❌ | Desempregado")
      .setDescription(`Ops! Parece que você não tem um emprego\nUse *${prefix}empregos* para conseguir o seu`)
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    let work = await db.get(`job_${message.author.id}.job`)
    let hasWork = await db.has(`job_${message.author.id}.hasJob`)
    if (!hasWork) return message.reply({ embeds: [hasWorkEmbed], ephemeral: true })
    let wage = await db.get(`job_${message.author.id}.wage`)
    let successEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("✅ | Você trabalhou com sucesso")
      .setDescription(`Você trabalhou de ${work}`)
      .addField(`💰 Salário Recebido`,`\`\`\`js\n${formattedMoneyValue.format(wage)}\`\`\`` )
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    message.reply({ embeds: [successEmbed] }).then(() => {
      db.add(`hand_money_${message.author.id}`, wage)
    })
  }
}