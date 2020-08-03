const { MessageEmbed, Permissions } = require('discord.js')
const { green } = require('../colors.json')

module.exports = (bot, webhook, member) => {
  const embed = new MessageEmbed()
    .setColor(green)
    .setTitle(`🎉 Welcome to ${member.user.username} who has just joined the server!`, '\u200b', false)

  const generalChannels = ['welcome', 'general', 'off-topics']

  const getGeneralChannel = member.guild.channels.cache.find(
    (c) => c.name === generalChannels.find((g) => g === c.name)
  )

  const getLogsChannel = member.guild.channels.cache.find((c) => c.name === 'logs')

  if (getGeneralChannel !== undefined) {
    if (getGeneralChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
      // Check if the bot has the permission to send a message in the channel
      getGeneralChannel.send(embed)
    }
  }

  if (getLogsChannel !== undefined) {
    if (getLogsChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
      // Check if the bot has the permission to send a message in the channel
      getLogsChannel.send(embed)
    }
  }

  console.log(`${member.user.tag} has just joined ${member.guild.name}`)
}
