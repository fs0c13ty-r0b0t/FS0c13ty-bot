const { MessageEmbed } = require('discord.js')
const { red } = require('../colors.json')

module.exports = (bot, webhook, guild) => {
  const embed = new MessageEmbed().setColor(red).setTitle(`Leave **${guild.name}** with ${guild.memberCount} users`)

  webhook.send(embed)
  console.log(`Leave ${guild.name} with ${guild.memberCount} users`)
}
