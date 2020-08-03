const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Support',
    usage: `${prefix}support`,
    description: 'Need help? Join our discord support server',
    command: 'support',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    const embed = new MessageEmbed()
      .setColor(black)
      .setTitle('Need help?')
      .setURL('https://discord.gg/f3tZYXP')
      .addField('Join the support server', 'https://discord.gg/f3tZYXP', false)

    message.channel.send(embed)
  },
}
