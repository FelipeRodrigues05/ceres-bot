const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "resetDb",
  aliases: ['reset'],

  run: async (discordClient, message, args) => {

    let missingPermsEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`❌ | Falta de Permissões`)
      .setDescription(`Você precisa da permissão de \`ADMINISTRATOR\` para utilizar esse comando`)
      .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [missingPermsEmbed], ephemeral: true})

    let successEmbed = new MessageEmbed()
      .setColor("#6714cc")
      .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }) })
      .setDescription(`Banco de Dados resetado com sucesso`)
      .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })

    message.reply({ embeds: [successEmbed] }).then((err) => {
      db.deleteAll()
    })
  }
}