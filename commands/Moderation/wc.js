const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')

const { updateGuild } = require('../../models/guilds')

module.exports = {
  config: {
    name: 'Welcom channel',
    usage: `${prefix}wc <channelId>`,
    description: 'Change the welcome channel',
    command: 'wc',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    if (args[0] !== undefined) {
      message.channel.send(`Welcome channel set to <#${args[0]}>`).then((m) => setTimeout(() => m.delete(), 5000))
      updateGuild(message.guild.id, { welcomeChannel: args[0] })
    } else {
      message.channel.send('Please provide a channel ID').then((m) => setTimeout(() => m.delete(), 5000))
    }
  },
}
