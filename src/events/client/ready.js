const { discordClient } = require("../../../ceres");
const { prefix } = require("../../../config.json")

module.exports.help = {
  name: "Ready"
}

discordClient.on('ready', () => {
  discordClient.user.setPresence({ activities: [
    { name: `Use ${prefix}help para obter ajuda`, type: "PLAYING" }, 
    { name: "Desenvolvido por Fehzin' 41", type: "PLAYING" }],
    status: "dnd"
  })
  console.log(`Bot as logged in \n Tag: ${discordClient.user.tag}\n ID: ${discordClient.user.id}`)
})