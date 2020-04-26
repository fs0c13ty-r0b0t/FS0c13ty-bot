const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { yellow } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Kick',
    usage: `${prefix}kick <MENTION> <REASON>`,
    description: 'kick a member from your server',
    command: 'kick',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    message.delete()

    if (!message.member.hasPermission('KICK_MEMBERS')) {
      message.reply('You are not allowed to do that!').then((m) => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })
      return
    }

    const kickMember = message.mentions.users.first()
    if (!kickMember) {
      message.reply('Please mention the person to be kicked').then((m) =>
        setTimeout(() => {
          m.delete()
        }, 5000)
      )
    } else {
      const reason = args.length === 1 ? 'No reason provided' : args.slice(1).join(' ')

      message.guild.members.cache.find((m) => m.id === kickMember.id).kick(reason)

      const embed = new MessageEmbed()
        .setColor(yellow)
        .addField('Kicked member', `<@${kickMember.id}>`, false)
        .addField('Reason', reason, false)

      const logsChannel = message.guild.channels.cache.find((c) => c.name === 'logs')

      if (logsChannel) {
        // If the logs channel exist, send the logs
        if (logsChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
          // Check if the bot has the permission to send a message in the channel
          logsChannel.send(embed)
        }
      }
    }
  },
}
