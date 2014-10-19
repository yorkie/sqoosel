
var util = require('util');
var Field = require('../field');

function BooleanField(length) {
  if (!(this instanceof BooleanField))
    return new BooleanField(length);
  Field.call(this, 'BOOLEAN');
}
util.inherits(BooleanField, Field);

module.exports = BooleanField;

