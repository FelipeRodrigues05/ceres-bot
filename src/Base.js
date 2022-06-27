const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "",
  aliases: [''],

  run: async (discordClient, message, args) => {

    // COOLDOWN
    cooldowns = {}

    if (!cooldowns[message.author.id]) cooldowns[message.author.id] = { lastCMD: null }
    let lastCommand = cooldowns[message.author.id].lastCMD
    let timeout = ms("7 day")
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

    // FORMATAÇÃO DO MONEY
    const formattedMoneyValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
      maximumSignificantDigits: 2
    })

    let user = message.mentions.users.first()


  }
}