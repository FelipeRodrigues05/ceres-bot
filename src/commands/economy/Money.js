const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "Money",
  aliases: ['saldo', 'dinheiro'],

  run: async (discordClient, message, args) => {
    let user = message.mentions.users.first()
    if (!user) user = message.author

    const formattedMoneyValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
      maximumSignificantDigits: 2
    })

    let handMoney = await db.get(`hand_money_${user.id}`)
    let bankMoney = await db.get(`bank_money_${user.id}`)
    let moneyEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle(`Extrato bancário de ${user.username}`)
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .addFields(
        { name: 'Valor em mãos', value: `\`\`\`js\n${formattedMoneyValue.format(handMoney)}\`\`\``, inline: true },
        { name: 'Valor no banco', value: `\`\`\`js\n${formattedMoneyValue.format(bankMoney)}\`\`\``, inline: true }
      )

      message.reply({ embeds: [moneyEmbed] })

  }
}