const fetch = require('node-fetch')

module.exports = {
  getUser(userId, guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${userId}@${guildId}`, {
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

  createUser(userId, guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users`, {
        method: 'POST',
        headers: {
          authorization: `Basic ${process.env.TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          guildId: guildId,
        }),
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },

  updateUser(userId, guildId, data) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${userId}@${guildId}`, {
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

  deleteUser(userId, guildId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${userId}@${guildId}`, {
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
