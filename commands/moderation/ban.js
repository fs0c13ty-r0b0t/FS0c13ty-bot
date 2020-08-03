const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { red } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Ban',
    usage: `${prefix}ban <MENTION> <REASON>`,
    description: 'Ban a member from your server',
    command: 'ban',
    displayHelp: true,
    permissionNeeded: 'BAN_MEMBERS',
  },

  run: async (bot, message, args) => {
    const banMember = message.mentions.users.first()
    if (!banMember) {
      message.reply('Please mention the person to be banned').then((m) =>
        setTimeout(() => {
          m.delete()
        }, 5000)
      )
    } else {
      const reason = args.length === 1 ? 'No reason provided' : args.slice(1).join(' ')

      message.guild.members.ban(banMember, { days: 7, reason: reason })

      const embed = new MessageEmbed()
        .setColor(red)
        .addField('Banned member', `<@${banMember.id}>`, false)
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
