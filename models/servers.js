const fetch = require('node-fetch')

// Get a server
exports.getServer = (guildId, callback) => {
  fetch(`http://localhost:8080/servers/${guildId}`, {
    headers: { 'access-token': process.env.TOKEN },
  })
    .then((res) => res.status)
    .then((status) => {
      callback(status)
    })
}

// Create a server
exports.createServer = (guildId, callback) => {
  fetch(`http://localhost:8080/servers/${guildId}/create`, {
    method: 'post',
    headers: { 'access-token': process.env.TOKEN },
  })
    .then((res) => res.status)
    .then((status) => callback(status))
}

// Update server config
exports.updateServerConfig = (guildId, config, callback) => {
  fetch(`http://localhost:8080/servers/${guildId}/config`, {
    method: 'post',
    body: JSON.stringify(config),
    headers: { 'Content-Type': 'application/json', 'access-token': process.env.TOKEN },
  })
    .then((res) => {
      return {
        status: res.status,
        data: res.json(),
      }
    })
    .then((json) => callback(json))
}
