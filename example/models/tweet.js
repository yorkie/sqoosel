
var User = require('./user');
var sqoosel = require('../../');
var types = sqoosel.types;

var TweetSchema = new sqoosel.Schema({
  'id': types.bigserial().asPrimary(),
  'user': types.bigserial().reference(User.id),
  'content': types.text().setDefault('')
});

module.exports = sqoosel.model('tweet', TweetSchema);
