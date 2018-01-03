const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    console.log('error: ' + error);
    console.log('response: ' + response);
    console.log('body: ' + body);
  });
}

module.exports.getReposByUsername = getReposByUsername;