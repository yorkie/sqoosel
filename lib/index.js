
var sqoosel = {};

sqoosel.types = {
  'bigserial': require('./types/bigserial'),
  'smallserial': require('./types/smallserial'),
  'boolean': require('./types/boolean'),
  'date': require('./types/date'),
  'timestamp': require('./types/timestamp'),
  'char': require('./types/char'),
  'varchar': require('./types/varchar'),
  'text': require('./types/text')
};

sqoosel.Schema = require('./schema');
sqoosel.Field = require('./field');
sqoosel.model = require('./model');

module.exports = sqoosel;