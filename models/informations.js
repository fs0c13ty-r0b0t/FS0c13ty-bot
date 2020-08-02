const fetch = require('node-fetch')

// Test the connection to the API
module.exports = {
  apiInformations() {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/`, {
        headers: { 'access-token': process.env.TOKEN },
      })
        .then((res) => res.json())
        .then((content) => {
          resolve(content)
        })
    })
  },
}
