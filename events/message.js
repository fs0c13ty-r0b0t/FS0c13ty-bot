const { MessageEmbed } = require('discord.js')
const { prefix, colors, cooldownDuration } = require('../config.json')

const { getUser, updateUser } = require('../models/users')

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
      .setColor(colors.primary)
      .setTitle(message.content)
      .setFooter(`${message.author.tag} | ${message.guild.name}`, message.guild.iconURL())

    webhook.send(privateEmbed)

    // -------------------- Public logs --------------------

    const publicEmbed = new MessageEmbed()
      .setColor(colors.primary)
      .setTitle(message.content)
      .setFooter(`${message.author.tag} | #${message.channel.name}`, message.author.avatarURL())

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
    // Just a little trick to know if I'm under cooldown or not
    if (bot.cooldown.has(message.author.id) && process.env.NODE_ENV === 'dev') {
      message.delete()
    }

    // Update the user if he's not under cooldown
    if (!bot.cooldown.has(message.author.id)) {
      let user = await getUser(message.author.id, message.guild.id).then((user) => user)

      // Add a message to the counter
      user.levelData.messages++

      // Give a random number of xp (between 10 and 25)
      const xpGained = Math.floor(Math.random() * 15) + 10
      const xpToNextLevel = 5 * Math.pow(user.levelData.level, 2) + 36 * user.levelData.level + 89

      // Check if the user passed a new level
      if (user.levelData.experience >= xpToNextLevel) {
        user.levelData.level++
        user.levelData.experience = 0

        message.reply("You gained a level!\nYou're now at the level " + user.levelData.level)
      } else {
        user.levelData.experience += xpGained
      }

      let payload = {
        levelData: user.levelData,
      }
      // Update the user rank data
      updateUser(message.author.id, message.guild.id, payload)

      bot.cooldown.add(message.author.id)
    }

    // After the designated time, delete the user from the cooldown array
    let cDuration = process.env.NODE_ENV === 'dev' ? 10000 : cooldownDuration
    setTimeout(() => {
      bot.cooldown.delete(message.author.id)
    }, cDuration)
  }
}
