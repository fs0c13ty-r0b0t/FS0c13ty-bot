const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Purge',
    usage: `${prefix}purge <AMOUNT> <MENTION>`,
    description: 'Allow you to delete a list of messages',
    command: 'purge',
    aliases: ['clear'],
    displayHelp: true,
    permissionNeeded: 'MANAGE_MESSAGES',
  },

  run: async (bot, message, args) => {
    // Get amount and user
    const user = message.mentions.users.first()
    const amount = parseInt(args[0])
    // const amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])

    // Help message
    const embed = new MessageEmbed()
      .setColor(black)
      .setTitle('🗑️  Purge command')
      .setDescription('Allow you to delete a list of messages that are under 14 days old')
      .addField('Usage', `${prefix}purge <AMOUNT> <MENTION>`, false)
      .addField(
        'Informations',
        '`<AMOUNT>` Number of messages to delete (between 1 and 100) **required**\n`<MENTION>` Mention a person to delete only their messages **optional**',
        false
      )

    if (!amount) {
      message.channel.send(embed).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 20000)
      })
      return
    }

    // Fetch 100 messages (will be filtered and lowered up to max amount requested)
    await message.channel.messages
      .fetch({
        limit: 100,
      })
      .then((messages, messageToDelete) => {
        messageToDelete = messages.array().slice(0, amount)
        if (user) {
          const filterBy = user ? user.id : bot.user.id
          messageToDelete = messages
            .filter((m) => m.author.id === filterBy)
            .array()
            .slice(0, amount)
        }
        message.channel.bulkDelete(messageToDelete).catch((error) => console.log(error.stack))
      })
  },
}
