const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { version } = require('../../package.json')
const { black } = require('../../colors.json')

const { getApiVersion } = require('../../models/informations')

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
    let apiVersion = await getApiVersion().then((version) => {
      return version
    })

    let embed = await new MessageEmbed()
      .setColor(black)
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
      .addField('\u200b', '📍  **INFORMATIONS**', false)
      .addField('Support', 'https://discord.gg/nEDcagb', true)
      .addField('Source code', 'https://github.com/fs0c13ty-r0b0t/FS0c13ty-bot', true)
      .addField('🤖 Bot version', version, true)
      .addField('📁 API version', apiVersion, true)
      .addField('\u200b', '📍  **COMMANDS LIST**', false)

    bot.commands.forEach((c) => {
      if (c.config.displayHelp) {
        embed.addField(c.config.name, `${c.config.description}\n**Usage: **${c.config.usage}`, false)
      }
    })

    message.channel.send(embed)
  },
}
