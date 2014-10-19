
var util = require('util');
var Field = require('../field');

function BigSerialField() {
  if (!(this instanceof BigSerialField))
    return new BigSerialField();
  Field.call(this, 'BIGSERIAL');
}
util.inherits(BigSerialField, Field);

module.exports = BigSerialField;
