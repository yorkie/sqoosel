
var Schema = require('./schema');
var Field = require('./field');
var model = require('./model');

function sqoosel(options) {
  model.setQueryFn(options.query);
};

sqoosel.types = {
  'bigserial': require('./types/bigserial'),
  'smallserial': require('./types/smallserial'),
  'integer': require('./types/integer'),
  'boolean': require('./types/boolean'),
  'date': require('./types/date'),
  'timestamp': require('./types/timestamp'),
  'char': require('./types/char'),
  'varchar': require('./types/varchar'),
  'text': require('./types/text')
};

sqoosel.Schema = Schema;
sqoosel.Field = Field;
sqoosel.model = model;

module.exports = sqoosel;
