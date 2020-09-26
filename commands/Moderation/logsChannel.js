const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')

const { updateGuild } = require('../../models/guilds')

module.exports = {
  config: {
    name: 'Logs channel',
    usage: `${prefix}lc <channelId>`,
    description: 'Change the logs channel',
    command: 'lc',
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

      message.channel.send(`Logs channel set to <#${channelId}>`).then((m) => setTimeout(() => m.delete(), 5000))
      updateGuild(message.guild.id, { 'channels.logsChannel': channelId })
    } else {
      message.channel.send('Please provide a channel ID').then((m) => setTimeout(() => m.delete(), 5000))
    }
  },
}
