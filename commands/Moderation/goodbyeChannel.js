const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')

const { updateGuild } = require('../../models/guilds')

module.exports = {
  config: {
    name: 'Goodbye channel',
    usage: `${prefix}gc <channelId>`,
    description: 'Change the goodbye channel',
    command: 'gc',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    if (args[0] !== undefined) {
      let channelId

      if (args[0].startsWith('<')) {
        // If the channel is mentionned
        channelId = args[0].match(/\d+/)[0]
      } else {
        // If the given channel is an ID
        channelId = args[0]
      }

      message.channel.send(`Goodbye channel set to <#${channelId}>`).then((m) => setTimeout(() => m.delete(), 5000))
      updateGuild(message.guild.id, { 'channels.goodbyeChannel': channelId })
    } else {
      message.channel.send('Please provide a channel ID').then((m) => setTimeout(() => m.delete(), 5000))
    }
  },
}
