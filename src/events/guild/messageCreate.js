const { discordClient } = require("../../../ceres");
const { prefix } = require("../../../config.json")

module.exports.help = {
  name: "MessageCreate"
}

discordClient.on('messageCreate', async (message) => {
  if (message.channel.type === "DM" || message.author.bot) return;

  if (message.content == `${prefix}ping`) {
    message.channel.send("Pong")
  }
})