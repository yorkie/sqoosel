
var util = require('util');
var Field = require('../field');

function SmallSerialField() {
  if (!(this instanceof SmallSerialField))
    return new SmallSerialField();
  Field.call(this, 'BIGSERIAL');
}
util.inherits(SmallSerialField, Field);

module.exports = SmallSerialField;
