const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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

let save = (data) => { // although i could use it sending always an array, and if i wish to save one
                       // it will be an array of one length
  if (!Array.isArray(data)) {
    saveSingleRepo(data);
  } else {
    data.forEach(saveSingleRepo);
  }

  // Won't work because my repo schema has owner id and login instead of the whole object.
  // Repo.create(data, (err, repos) => {
  //   console.log('Saved: ' + repos);
  // });
}

let saveSingleRepo = (repo) => { // assuming I will send as argument a repo as found in data.json
  let repoToAdd = new Repo(repo);
  repoToAdd.owner_id = repo.owner.id;
  repoToAdd.owner_login = repo.owner.login;
  repoToAdd.save((err, repoToAdd) => {
    console.log('Saved repo: ' + repoToAdd.name + ', with id: ' + repoToAdd.id);
  });
};

module.exports.save = save;
module.exports.Repo = Repo;