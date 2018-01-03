const request = require('request');
const token = process.env.GITHUB_KEY || require('../config.js').TOKEN;

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, body);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;