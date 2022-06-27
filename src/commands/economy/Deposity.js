const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "Deposity",
  aliases: ['dep', 'depositar'],

  run: async (discordClient, message, args) => {
    const formattedMoneyValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
      maximumSignificantDigits: 2
    })

    let value = args[0]
    let handMoney = await db.get(`hand_money_${message.author.id}`)

    if (value == 'all' || value == 'td' || value == 'tudo') {
      let depositedMoneyEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`✔ | Valor Depositado com sucesso`)
        .addField('Valor Depositado', `\`\`\`js\n${formattedMoneyValue.format(handMoney)}\`\`\``)
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
        .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

      message.reply({ embeds: [depositedMoneyEmbed] })
      db.set(`hand_money_${message.author.id}`, 0)
      db.add(`bank_money_${message.author.id}`, handMoney)

    } else {
      if (handMoney > 0) {
        let depositedMoneyEmbed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(`✅ | Valor Depositado com sucesso`)
          .addField('💰 Valor Depositado', `\`\`\`js\n${formattedMoneyValue.format(value)}\`\`\``)
          .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
          .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

        message.reply({ embeds: [depositedMoneyEmbed] })
        db.sub(`hand_money_${message.author.id}`, value)
        db.add(`bank_money_${message.author.id}`, Number(value))

      } else {
        let insufficientValueEmbed = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌ | Probe")
          .setDescription(`Você está probe, por isso não consegue depositar o valor desejado`)
          .setFooter({ text: `Requisitado Por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
          .setTimestamp()

        message.reply({ embeds: [insufficientValueEmbed] })
      }
    }
  }
}