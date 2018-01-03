const express = require('express');
const { save, Repo } = require('../database/index.js');
const { getReposByUsername } = require('../helpers/github.js');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(express.static(__dirname + '/../client/dist'));


app.use(cors());

app.post('/repos', bodyParser.json(), function (req, res) {
  console.log(req.body.username);
  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      console.log('GitHub API failed.');
      res.send(502, 'GitHub API failed to deliver.');
      return;
    }
    save(JSON.parse(data), err => {
      if (err) {
        console.log('Error while saving.');
        res.send(500, 'Save to DB failed.');
        return;
      }
      console.log('Saved successfully.');
      res.send(201, 'Created Repos in DB.');
    });
  });
});

app.get('/repos', function (req, res) { // TODO: Sort the TOP 25, however I want.
  Repo.find((err, repos) => {
    if (err) {
      console.error(err);
      res.send(500, 'Error produced?');
      return;
    }
    if (repos.length > 0) {
      res.json(repos);
    } else {
      res.send(404, 'No Repos in DB.');
    }
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

