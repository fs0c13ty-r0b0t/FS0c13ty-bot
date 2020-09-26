const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { deleteGuild } = require('../models/guilds')
const { deleteUser } = require('../models/users')

module.exports = (bot, webhook, guild) => {
  const embed = new MessageEmbed()
    .setColor(colors.error)
    .setTitle(`Leave **${guild.name}** with ${guild.memberCount} users`)

  webhook.send(embed)
  console.log(`Leave ${guild.name} with ${guild.memberCount} users`)

  guild.members.cache.map((m) => deleteUser(m.id, guild.id))

  deleteGuild(guild.id)
}
