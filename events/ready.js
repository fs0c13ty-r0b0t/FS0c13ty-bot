const { prefix } = require('../config.json')

module.exports = async (bot) => {
  console.log(`Ready to serve ${bot.guilds.cache.reduce((mem, g) => (mem += g.memberCount), 0)} users`)

  let statses = [
    `${bot.guilds.cache.reduce((mem, g) => (mem += g.memberCount), 0)} users`,
    `${bot.guilds.cache.size} servers`,
    `${prefix}help`,
  ]

  setInterval(function () {
    let status = statses[Math.floor(Math.random() * statses.length)]
    bot.user.setActivity(status, { type: 'WATCHING' })
  }, 60000)
}
