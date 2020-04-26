const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const { black } = require('../colors.json')

module.exports = async (bot, webhook, message) => {
  if (message.author.bot) return // Ignore all bots
  if (message.author.id === bot.user.id) return // Ignore bot itself
  if (message.channel.type === 'dm') return // Ignore private messages

  // -------------------- Command prefix --------------------

  if (!message.content.startsWith(prefix)) return // Ignore messages not starting with the prefix (in config.json)

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

  cmd.run(bot, message, args) // Run the command
}
