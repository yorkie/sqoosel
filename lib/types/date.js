
var util = require('util');
var Field = require('../field');

function DateField() {
  if (!(this instanceof DateField))
    return new DateField();
  Field.call(this, 'DATE');
}
util.inherits(DateField, Field);

module.exports = DateField;
