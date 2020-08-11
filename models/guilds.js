const fetch = require('node-fetch')

module.exports = {
  createGuild(guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/guilds/${guildId}`, {
        method: 'POST',
        headers: {
          authorization: `Basic ${process.env.TOKEN}`,
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },

  deleteGuild(guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/guilds/${guildId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Basic ${process.env.TOKEN}`,
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },
}
