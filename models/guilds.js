const fetch = require('node-fetch')

module.exports = {
  getGuild(guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/guilds/${guildId}`, {
        method: 'GET',
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

  updateGuild(guildId, data) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/guilds/${guildId}`, {
        method: 'PUT',
        headers: {
          authorization: `Basic ${process.env.TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
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
