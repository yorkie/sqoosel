
var User = require('./models/user');
var Tweet = require('./models/tweet');

function addUser(username) {
  var q = User.insert({username: username}).toQuery();
  console.log(q);
}

function findUser(username) {
  var q = User.select().from()
    .where({username: username}).order(User.createdAt.desc).toQuery();
  console.log(q);
}

addUser('yorkie');
findUser('yorkie');