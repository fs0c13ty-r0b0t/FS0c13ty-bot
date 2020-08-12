const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { getGuild } = require('../models/guilds')
const { createUser } = require('../models/users')

module.exports = async (bot, webhook, member) => {
  let guildData = await getGuild(member.guild.id).then((data) => data)

  console.log(guildData)

  if (guildData.welcomeChannel !== null) {
    const welcomeChannel = member.guild.channels.cache.find((c) => c.id === guildData.welcomeChannel)

    if (welcomeChannel) {
      // If the logs channel exist, send the logs
      if (welcomeChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
        // Check if the bot has the permission to send a message in the channel
        welcomeChannel.send('user join the server')
      }
    }
  }

  createUser(member.user.id, member.guild.id)
}
