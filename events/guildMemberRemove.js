const { MessageEmbed } = require('discord.js')
const { colors } = require('../config.json')

const { deleteUser } = require('../models/users')

module.exports = (bot, webhook, member) => {
  deleteUser(member.user.id, member.guild.id)
}
