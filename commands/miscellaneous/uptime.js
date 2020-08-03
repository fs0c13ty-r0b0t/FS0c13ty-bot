const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Uptime',
    usage: `${prefix}uptime`,
    description: 'Time since the robot was turned on',
    command: 'uptime',
    displayHelp: false,
  },

  run: async (bot, message, args) => {
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString()
      const min = Math.floor((ms / (1000 * 60)) % 60).toString()
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
      // Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
      return `${days.padStart(1, '0')} day|s, ${hrs.padStart(2, '0')} hour|s, ${min.padStart(
        2,
        '0'
      )} minute|s, ${sec.padStart(2, '0')} second|s, `
    }

    const embed = new MessageEmbed()
      .setColor(black)
      .setAuthor('🔌 Uptime', '', 'https://github.com/LucasCtrl/FS0c13ty')
      .setDescription(duration(bot.uptime))

    message.channel.send({ embed })
  },
}
