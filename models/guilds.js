const fetch = require('node-fetch')

// Test the connection to the API
module.exports = {
  createGuild(guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/guilds/${guildId}/create`, {
        method: 'POST',
        headers: { 'access-token': process.env.TOKEN },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },
}
