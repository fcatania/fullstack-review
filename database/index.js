const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true, dropDups: true },
  name: String,
  owner_id: Number,
  owner_login: String,
  url: String,
  description: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  stargazers_count: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  let repos = [];
  data.forEach(repo => {
    repos.push(transformRepoIntoSchemaRepo(repo));
  });
  Repo.create(repos, err => {
    callback(err);
  });
}

let transformRepoIntoSchemaRepo = (repo) => { // assuming I will send as argument a repo as found in data.json
  let repoToAdd = new Repo(repo);
  repoToAdd.owner_id = repo.owner.id;
  repoToAdd.owner_login = repo.owner.login;
  return repoToAdd;
};

module.exports.save = save;
module.exports.Repo = Repo;