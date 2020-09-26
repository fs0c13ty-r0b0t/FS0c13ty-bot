const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { createGuild } = require('../models/guilds')
const { createUser } = require('../models/users')

module.exports = (bot, webhook, guild) => {
  const embed = new MessageEmbed()
    .setColor(colors.success)
    .setTitle(`Join **${guild.name}** with ${guild.memberCount} users`)

  webhook.send(embed)
  console.log(`Join ${guild.name} with ${guild.memberCount} users`)

  guild.members.cache.map((m) => createUser(m.id, guild.id))

  createGuild(guild.id)
}
