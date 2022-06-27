const { discordClient } = require("../../../ceres");
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports.help = {
  name: "MessageCreate"
}

discordClient.on('messageCreate', async (message) => {
  let prefix = await db.get(`prefix_${message.guild.id}`)
  if (!prefix) prefix = "ce!"

  if (message.channel.type === "DM" || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return // Se a mensagem não começa com prefixo, o Cliente não faz nada

  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  let commands = discordClient.commands.get(cmd.slice(prefix.length)) || discordClient.commands.get(discordClient.aliases.get(cmd.slice(prefix.length)))

  if (commands) {
    commands.run(discordClient, message, args);
  }

})