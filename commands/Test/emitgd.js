const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    command: 'emitgd',
    description: 'guildDelete event',
  },

  run: async (bot, message, args) => {
    bot.emit('guildDelete', message.guild)
  },
}
