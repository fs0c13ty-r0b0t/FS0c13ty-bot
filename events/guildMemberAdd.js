const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { createUser } = require('../models/users')

module.exports = (bot, webhook, member) => {
  createUser(member.user.id, member.guild.id)
}
