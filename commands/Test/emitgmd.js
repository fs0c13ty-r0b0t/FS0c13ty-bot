const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    command: 'emitgmr',
    description: 'guildMemberRemove event',
  },

  run: async (bot, message, args) => {
    bot.emit('guildMemberRemove', message.member)
  },
}
