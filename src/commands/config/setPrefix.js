const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "setPrefix",
  aliases: ['setprefix', 'prefixo'],

  run: async (discordClient, message, args) => {

    let missingPermsEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`❌ | Falta de Permissões`)
      .setDescription(`Você precisa da permissão de \`ADMINISTRATOR\` para utilizar esse comando`)
      .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [missingPermsEmbed], ephemeral: true})

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
      .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
      .setDescription(`Novo Prefixo: *${prefix}*`)
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

      message.reply({ embeds: [successEmbed] }).then(() => {
        db.set(`prefix_${message.guild.id}`, prefix)
      })
  }
}