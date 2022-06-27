const { Client, Collection } = require("discord.js")
const discordClient = new Client({ intents: 32767, partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER'] })
const { token } = require("./config.json")
const { readdirSync } = require("fs")

discordClient.login(token)
module.exports.discordClient = discordClient

discordClient.commands = new Collection()
discordClient.aliases = new Collection()
discordClient.events = new Collection()

// TODO: Conectar com algum banco de dados


readdirSync(`./src/commands`).forEach((category) => {
  const commands = readdirSync(`./src/commands/${category}`).filter((command) => command.endsWith('.js'))

  for(let file of commands) {
    const command = require(`./src/commands/${category}/${file}`)

    if(command.name) {
      discordClient.commands.set(command.name, command)
      console.log(`[COMMAND] File ${command.name} was loaded successfully`)
    } 
    if(command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach(alias => discordClient.aliases.set(alias, command.name))
    }
  }
})

readdirSync(`./src/events`).forEach((category) => {
  const events = readdirSync(`./src/events/${category}`).filter((event) => event.endsWith(".js"))

  for(let file of events) {
    const event = require(`./src/events/${category}/${file}`)

    if(event.help.name) {
      discordClient.events.set(event.help.name, event)
      console.log(`[EVENT] File ${event.help.name} was loaded successfully`)
    }
  }
})