const { MessageEmbed } = require('discord.js')
const { green } = require('../colors.json')

const { createGuild } = require('../models/guilds')

module.exports = (bot, webhook, guild) => {
  const embed = new MessageEmbed().setColor(green).setTitle(`Join **${guild.name}** with ${guild.memberCount} users`)

  webhook.send(embed)
  console.log(`Join ${guild.name} with ${guild.memberCount} users`)

  createGuild(guild.id)
}
