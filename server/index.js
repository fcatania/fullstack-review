const express = require('express');
let app = express();
const { save, Repo } = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

// Allowing CORS. Can also use 'cors' middleware.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/repos', function (req, res) {
  // TODO: Get repos from github API.
  // console.log(req.body); // TODO: require and npm install bodby parser middleware to easy get body.
                         // OR: send the term as /repos/:term and use req.params.term or sth like it.
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

