const { readdirSync } = require('fs')
const { resolve } = require('path')

module.exports = (bot, webhook) => {
  const events = readdirSync(resolve(__dirname, '../events/')).filter((d) => d.endsWith('.js'))
  for (let file of events) {
    const evt = require(`../events/${file}`)
    let eName = file.split('.')[0]

    bot.on(eName, evt.bind(null, bot, webhook))
  }
}
