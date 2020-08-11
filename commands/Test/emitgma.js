const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    command: 'emitgma',
    description: 'guildMemberAdd event',
  },

  run: async (bot, message, args) => {
    bot.emit('guildMemberAdd', message.member)
  },
}
