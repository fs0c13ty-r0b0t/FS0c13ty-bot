const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { yellow } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Slowmode',
    usage: `${prefix}slowmode <seconds>`,
    description: 'set slowmode time for channel',
    command: 'slowmode',
    displayHelp: true,
    permissionNeeded: 'MANAGE_MESSAGES',
  },

  run: async (bot, message, args) => {
    const time = args[0];
    message.channel.setRateLimitPerUser(time);
  },
}
