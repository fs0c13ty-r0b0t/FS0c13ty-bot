const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { blue } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Stats',
    usage: `${prefix}stats`,
    description: 'Global informations about the bot',
    command: 'stats',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    let memoryStats = process.memoryUsage()

    const embed = new MessageEmbed()
      .setColor(blue)
      .setAuthor(`Stats - ${bot.user.username}`, bot.user.avatarURL)
      .addField('Number of servers ¬', bot.guilds.cache.size.toLocaleString(), true)
      .addField(
        'Number of users ¬',
        bot.guilds.cache.reduce((mem, g) => (mem += g.memberCount), 0),
        true
      )
      .addField('Number of emojis ¬', bot.emojis.cache.size, true)
      .addField('Number of channels ¬', bot.channels.cache.size, true)
      .addField('Memory usage ¬', `${Math.ceil(memoryStats.heapUsed / 1048576)} Mo`, true)
      .addField('Discord.js version ¬', '11.4.2', true)
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)

    message.channel.send(embed)
  },
}
