const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "ping",
  aliases: ['p'],

  run: async (discordClient, message, args) => {
    let member = message.author;

    const guild = discordClient.guilds.cache.get(message.guild.id);
    const memberIcon = member.displayAvatarURL({ dynamic: true, size: 2048 });
    const guildIcon = guild.iconURL({ dynamic: true, size: 2048 });
    const ping = await message.channel.send("Pong!");
    ping.delete();

    const pingEmbed = new MessageEmbed()
      .setAuthor({ name: guild.name, iconURL: guildIcon })
      .setColor("RANDOM")
      .setTitle("Ping do Bot")
      .setThumbnail(guildIcon)
      .addFields(
        { name: "🖥️ Ping do servidor ", value: `\`\`\`${ping.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true },
        { name: "⏲️ Ping da API", value: `\`\`\`${Math.round(discordClient.ws.ping)}ms\`\`\``, inline: true }
      )
      .setFooter({ text: `Requisitado por: ${member.username}`, iconURL: memberIcon })

    message.reply({ embeds: [pingEmbed] })

  }
}