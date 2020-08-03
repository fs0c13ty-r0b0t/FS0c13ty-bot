const { readdirSync } = require('fs')
const { resolve } = require('path')

module.exports = (bot) => {
  const load = (dirs) => {
    const commands = readdirSync(resolve(__dirname, `../commands/${dirs}/`)).filter((d) => d.endsWith('.js'))
    for (let file of commands) {
      let cmd = require(`../commands/${dirs}/${file}`)
      bot.commands.set(cmd.config.command, cmd)
      if (cmd.config.aliases) cmd.config.aliases.forEach((a) => bot.aliases.set(a, cmd.config.command))
    }
  }

  const dirs = ['miscellaneous', 'moderation', 'owner']

  dirs.forEach((x) => load(x))
}
