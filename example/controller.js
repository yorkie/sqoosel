
var pg = require('pg');
var sqoosel = require('../');
var User = require('./models/user');
var Tweet = require('./models/tweet');

function addUser(username) {
  User.insert({username: username})
  .exec(function(err, result) {
    // insert successfully
  });
}

function findUser(username) {
  User.select()
  .where({username: username})
  .order(User.createdAt.desc)
  .limit(100)
  .exec(function(err, result) {
    // get result
  });
}

sqoosel({
  query: function(exec) {
    pg.connect('postgres://username:password@localhost/database', function(err, client, close) {
      exec(err, client.query, close);
    });
  }
});

addUser('yorkie');
findUser('yorkie');