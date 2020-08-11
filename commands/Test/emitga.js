const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    command: 'emitga',
    description: 'guildAdd event',
  },

  run: async (bot, message, args) => {
    bot.emit('guildCreate', message.guild)
  },
}
