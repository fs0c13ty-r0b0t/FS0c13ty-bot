const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Invite',
    usage: `${prefix}invite`,
    description: 'Add the bot on your server',
    command: 'invite',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    message.delete()

    const embed = new MessageEmbed()
      .setColor(black)
      .setTitle('Would like to invite the bot on your server?')
      .setURL('https://discordapp.com/oauth2/authorize?client_id=419837857356709908&scope=bot&permissions=805661766')
      .addField(
        'Simply click on the link',
        'https://discordapp.com/oauth2/authorize?client_id=419837857356709908&scope=bot&permissions=805661766',
        false
      )

    message.channel.send(embed)
  },
}
