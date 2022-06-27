const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
cooldowns = {}

module.exports = {
  name: "Box",
  aliases: ['caixa', 'box'],

  run: async (discordClient, message, args) => {
    
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = "ce!"
  
    if (!cooldowns[message.author.id]) cooldowns[message.author.id] = { lastCMD: null } // SEM COMANDOS
    let lastCommand = cooldowns[message.author.id].lastCMD // +1 LAST COMMAND
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

    let successEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("✅ | Procurador")
      .setDescription(`Você foi procurar algo e encontrou uma caixa\n Use ${prefix}abrircaixa para abri-lá`)
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
      .setFooter({ text: `${discordClient.user.username}`, iconURL: discordClient.user.displayAvatarURL({ dynamic: true, size: 2048 }) })

    message.reply({ embeds: [successEmbed] }).then((err) => {
      if(err) return message.reply({ content: `Houve algum erro ao adicionar o dinheiro à sua conta`, ephemeral: true })
      console.error(err);

      db.add(`boxes_${message.author.id}`, 1)
    })
  }
}