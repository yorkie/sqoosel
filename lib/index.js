
var sqoosel = {};

sqoosel.types = {
  'BigSerialField': require('./types/bigserial'),
  'SmallSerialField': require('./types/smallserial'),
  'BooleanField': require('./types/boolean'),
  'DateField': require('./types/date'),
  'TimestampField': require('./types/timestamp'),
  'CharField': require('./types/char'),
  'VarCharField': require('./types/varchar')
};

sqoosel.Schema = require('./schema');
sqoosel.Field = require('./field');
sqoosel.model = require('./model');

module.exports = sqoosel;