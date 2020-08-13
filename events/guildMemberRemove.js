const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { getGuild } = require('../models/guilds')
const { deleteUser } = require('../models/users')

module.exports = async (bot, webhook, member) => {
  let guildData = await getGuild(member.guild.id).then((data) => data)

  if (guildData.channels.goodbyeChannel !== null) {
    const goodbyeChannel = member.guild.channels.cache.find((c) => c.id === guildData.channels.goodbyeChannel)

    if (goodbyeChannel) {
      // If the logs channel exist, send the logs
      if (goodbyeChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
        // Check if the bot has the permission to send a message in the channel
        const embed = new MessageEmbed()
          .setColor(colors.error)
          .setDescription(`:wave: Goodbye to **${member.user.username}** who just leaved the server...`)
        goodbyeChannel.send(embed)
      }
    }
  }

  deleteUser(member.user.id, member.guild.id)
}
