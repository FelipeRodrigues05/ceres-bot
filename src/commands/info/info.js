const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "info",
  aliases: ['botinfo'],

  run: async (discordClient, message, args) => {

    function msToHour(duration) {
      let seconds = Math.floor(duration / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)

      hours = hours % 24;

      return `${hours}h${minutes}m${seconds}s`
    }

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = "ce!"

    let botInfoEmbed = new MessageEmbed()
      .setColor("#6714cc")
      .setAuthor({ name: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setTitle("Informações do Bot")
      .addFields(
        { name: `Prefixo`, value: `\`\`\`${prefix}\`\`\``, inline: true },
        { name: `Criador`, value: `\`\`\`Fehzin' 41\`\`\``, inline: true },
        { name: `Criado em`, value: `\`\`\`js\n${moment(discordClient.user.createdTimestamp).format("DD/MM/YYYY hh:mm")}\`\`\``, inline: true },
        { name: `Estou on a`, value: `\`\`\`js\n${msToHour(discordClient.uptime)}\`\`\``, inline: true },
        { name: `Estou em`, value: `\`\`\`${discordClient.guilds.cache.size} servidores\`\`\``, inline: true },
        { name: `Estou em`, value: `\`\`\`${discordClient.channels.cache.size} canais\`\`\``, inline: true }
      )
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

      message.reply({ embeds: [botInfoEmbed] })
  }
}