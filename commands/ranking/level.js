const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

const { getUser } = require('../../models/users')

module.exports = {
  config: {
    name: 'Information related to the user level',
    usage: `${prefix}level`,
    description: 'Get your ranking informations',
    command: 'level',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    const beforeData = await new MessageEmbed().setColor(black).setDescription('Retrieving the informations...')

    message.channel.send(beforeData).then((m) => {
      getUser(message.guild.id, message.author.id).then((user) => {
        console.log(user.data)
        console.log(message)

        const afterData = new MessageEmbed()
          .setColor(black)
          .setDescription(`Information about <@${message.author.id}>'s level`)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .addField('Current level', user.data.rank.level)
          .addField(
            'Experience',
            `${user.data.rank.experience}/${5 * Math.pow(user.data.rank.level, 2) + 36 * user.data.rank.level + 89}`
          )
          .addField('Total messages sent', user.data.rank.messages)
          .setFooter('Note: You earn about 15 and 25 XP per message. Your XP is reinitialized when you gain a level.')

        m.edit(afterData)

        // `
        //     Username: <@${message.author.id}>
        //     Current level: ${user.data.rank.level}
        //     Messages sent: ${user.data.rank.messages}
        //     Experience: ${user.data.rank.experience}/${
        //
        // }
        //   `
      })
    })
  },
}
