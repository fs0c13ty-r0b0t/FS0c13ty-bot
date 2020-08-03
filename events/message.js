const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const { black } = require('../colors.json')

const { createUser, getUser, updateUserLevel } = require('../models/users')

module.exports = async (bot, webhook, message) => {
  if (message.author.bot) return // Ignore all bots
  if (message.author.id === bot.user.id) return // Ignore bot itself
  if (message.channel.type === 'dm') return // Ignore private messages

  // -------------------- Message with prefix --------------------

  if (message.content.startsWith(prefix)) {
    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    // Grab the command data from the client Collection
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))

    if (!cmd) return // If that command doesn't exist, silently exit and do nothing

    // -------------------- Private logs --------------------

    const privateEmbed = new MessageEmbed()
      .setColor(black)
      .setTitle('New command')
      .setDescription(message.content)
      .addField('Author', message.author, true)
      .addField('Channel', `#${message.channel.name}`, true)
      .setFooter(`On ${message.guild.name}`, message.guild.iconURL)

    webhook.send(privateEmbed)

    // -------------------- Public logs --------------------

    const publicEmbed = new MessageEmbed()
      .setColor(black)
      .setTitle('New command')
      .setDescription(message.content)
      .addField('Author', message.author, true)
      .addField('Channel', message.channel, true)

    const logsChannel = message.guild.channels.cache.find((c) => c.name === 'logs')

    if (logsChannel) {
      // If the logs channel exist, send the logs
      if (logsChannel.permissionsFor(bot.user).has(['SEND_MESSAGES'])) {
        // Check if the bot has the permission to send a message in the channel
        logsChannel.send(publicEmbed)
      }
    }

    // -------------------- Command execution --------------------

    message.delete()
    if (!message.member.hasPermission(cmd.config.permissionNeeded)) {
      message.reply('You are not allowed to do that!').then((m) => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })
      return
    }
    cmd.run(bot, message, args) // Run the command
  }

  // -------------------- Leveling system --------------------
  else {
    function updateUser(userData) {
      const rankData = {
        level: userData.rank.level,
        messages: userData.rank.messages,
        experience: userData.rank.experience,
      }

      // Add a message to the counter
      rankData.messages++

      // Give a random number of xp (between 10 and 25)
      const xpGained = Math.floor(Math.random() * 15) + 10
      const xpToNextLevel = 5 * Math.pow(rankData.level, 2) + 36 * rankData.level + 89

      // Check if the user passed a new level
      if (rankData.experience >= xpToNextLevel) {
        rankData.level++
        rankData.experience = 0

        message.reply("You gained a level!\nYou're now at the level " + rankData.level)
      } else {
        rankData.experience += xpGained
      }

      // Update the user rank data
      updateUserLevel(message.guild.id, message.author.id, rankData)
    }

    getUser(message.guild.id, message.author.id).then((user) => {
      if (user.data !== null) {
        updateUser(user.data)
      } else {
        createUser(message.guild.id, message.author.id).then((user) => updateUser(user.data))
      }
    })
  }
}
