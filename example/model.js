
var sqoosel = require('../');
var types = sqoosel.types;
var Schema = sqoosel.Schema;

var UserSchema = new sqoosel.Schema({
  'id': types.BigSerialField().asPrimary(),
  'username': types.VarCharField(256).setDefault(123),
  'createdAt': types.TimestampField().setDefault('now() at time zone "utc"')
});

var UserModel = sqoosel.model('user', UserSchema);
console.log(UserModel.toString());