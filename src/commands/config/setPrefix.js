const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "setPrefix",
  aliases: ['setprefix', 'prefixo'],

  run: async (discordClient, message, args) => {

    let missingArgumentsEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle("❌ | Falta de argumentos")
      .setDescription(`Você precisa colocar o prefixo`)
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setTimestamp()

    let prefix = args[0]
    if (!prefix) return message.reply({ embeds: [missingArgumentsEmbed] })

    let successEmbed = new MessageEmbed()
      .setColor("#6714cc")
      .setAuthor({ name: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setDescription(`Novo Prefixo: ${prefix}`)
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

      message.reply({ embeds: [successEmbed] }).then(() => {
        db.set(`prefix_${message.guild.id}`, prefix)
      })
  }
}