const { MessageEmbed } = require('discord.js')
const { green } = require('../colors.json')

module.exports = (bot, webhook, guild) => {
  const embed = new MessageEmbed().setColor(green).setTitle(`Join **${guild.name}** with ${guild.memberCount} users`)

  webhook.send(embed)
  console.log(`Join ${guild.name} with ${guild.memberCount} users`)
}
