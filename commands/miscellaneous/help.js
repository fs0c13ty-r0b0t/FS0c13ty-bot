const { MessageEmbed } = require('discord.js')
const { prefix, version } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Help',
    usage: `${prefix}help`,
    description: 'Display this menu',
    command: 'help',
    aliases: ['h', 'commands', 'info'],
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    let embed = new MessageEmbed()
      .setColor(black)
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
      .addField('\u200b', '📍  **INFORMATIONS**', false)
      .addField('Support', 'https://discord.gg/nEDcagb', true)
      .addField('Source code', 'https://github.com/LucasCtrl/FS0c13ty', true)
      .addField('📁 Version', version, true)
      .addField('\u200b', '📍  **COMMANDS LIST**', false)

    bot.commands.forEach((c) => {
      if (c.config.displayHelp) {
        embed.addField(c.config.name, `${c.config.description}\n**Usage: **${c.config.usage}`, false)
      }
    })

    message.channel.send(embed)
  },
}
