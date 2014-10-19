
var util = require('util');
var Field = require('../field');

function IntegerField() {
  if (!(this instanceof IntegerField))
    return new IntegerField();
  Field.call(this, 'INT');
}
util.inherits(IntegerField, Field);

module.exports = IntegerField;
