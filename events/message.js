const { MessageEmbed } = require('discord.js')
const { prefix, colors } = require('../config.json')

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

    console.log(message.guild)

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
    return
  }
}
