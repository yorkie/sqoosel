
var sqoosel = require('../../');
var types = sqoosel.types;

var UserSchema = new sqoosel.Schema({
  'id': types.bigserial().asPrimary(),
  'username': types.varchar(256).setDefault(123),
  'createdAt': types.timestamp().setDefault('now()')
});

module.exports = sqoosel.model('user', UserSchema);
