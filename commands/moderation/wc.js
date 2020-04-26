const { MessageEmbed } = require('discord.js')
const { getServer, createServer, updateServerConfig } = require('../../models/servers')
const { prefix } = require('../../config.json')
const { black } = require('../../colors.json')

module.exports = {
  config: {
    name: 'Welcome channel',
    usage: `${prefix}wc <CHANNELNAME>`,
    description: 'Define the welcome channel',
    command: 'wc',
    displayHelp: true,
  },

  run: async (bot, message, args) => {
    message.delete()

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.reply('You are not allowed to do that!').then((m) => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })
      return
    }

    if (args < 1) {
      // If only one choice
      const embed = new MessageEmbed()
        .setColor(black)
        .setTitle('🗒️ Welcome channel')
        .setDescription('Change the welcome channel')
        .addField('Usage', `${prefix}wc <Channel name>`, false)
        .addField('Informations', 'You need to provide a channel name without the `#` in front of it')

      message.channel.send({ embed }).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 20000)
      })
    } else {
      const channel = message.guild.channels.cache.find((c) => c.name === args[0])

      if (channel) {
        // If the logs channel exist

        const newConfig = {
          channels: {
            welcomeChannel: channel.id,
          },
        }

        getServer(message.guild.id, (status) => {
          if (status === 404) {
            createServer(message.guild.id, (status) => {
              updateServerConfig(message.guild.id, newConfig, (json) => {
                if (json.status === 200) {
                  message.reply(`You change the welcome channel to ${channel}`).then((m) => {
                    setTimeout(() => {
                      m.delete()
                    }, 5000)
                  })
                }
              })
            })
          } else {
            updateServerConfig(message.guild.id, newConfig, (json) => {
              if (json.status === 200) {
                message.reply(`You change the welcome channel to ${channel}`).then((m) => {
                  setTimeout(() => {
                    m.delete()
                  }, 5000)
                })
              }
            })
          }
        })
      } else {
        message.reply('Please, provide a right channel name (without the `#`)').then((m) => {
          setTimeout(() => {
            m.delete()
          }, 5000)
        })
      }
    }
  },
}
