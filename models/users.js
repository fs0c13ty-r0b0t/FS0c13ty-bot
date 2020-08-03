const fetch = require('node-fetch')

// Test the connection to the API
module.exports = {
  createUser(guildId, userId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${guildId}/${userId}/create`, {
        method: 'POST',
        headers: { 'access-token': process.env.TOKEN },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },

  getUser(guildId, userId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${guildId}/${userId}`, {
        method: 'GET',
        headers: { 'access-token': process.env.TOKEN },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },

  updateUserLevel(guildId, userId, rankData) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/users/${guildId}/${userId}/rank`, {
        method: 'POST',
        headers: {
          'access-token': process.env.TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rankData),
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },
}
