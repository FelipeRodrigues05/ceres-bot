const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "help",
  aliases: ['ajuda'],

  run: async (discordClient, message, args) => {
    let helpEmbed = new MessageEmbed()
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setTitle(`⁉ Ajuda`)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setColor("PURPLE")
      .setFooter({ text: discordClient.user.username, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048}) })
      .addFields(
        { name: `💰 | Economia`, value: `\`mendigar\`, \`trabalhar\`, \`crime\`, \`cc\`, \`prostituir\`, \`diario\`, \`semanal\`, \`mensal\`, \`dinheiro\`, \`sacar\`, \`roubar\`, \`plantacao\`, \`loja\`` },
        { name: `👤 | Usuário`, value: `\`editarperfil\`, \`inventario\`, \`perfil\`, \`ranking\`, \`casar\`, \`transar\`, \`emprego\`` },
        { name: "💻 | Criptomoedas", value: '\`minerar\`, \`pc\`, \`upgrade\`' },
        { name: '🎮 | Jogos', value: '\`caracoroa\`, \`roleta\`, \`snake\`, \`truco\`' },
        { name: '⚙ | Configurações', value: '\`reset\`, \`setprefix\`, \`addmoney\`, \`setmoney\`' }
      )

      message.reply({ embeds: [helpEmbed] })
  }
}