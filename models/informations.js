const fetch = require('node-fetch')

// Test the connection to the API
module.exports = {
  getApiVersion() {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.APIURL}/`, {
        headers: { 'access-token': process.env.TOKEN },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content.version)
        })
    })
  },
}
