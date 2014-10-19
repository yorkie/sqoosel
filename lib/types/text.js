
var util = require('util');
var Field = require('../field');

function TextField() {
  if (!(this instanceof TextField))
    return new TextField();
  Field.call(this, 'TEXT');
}
util.inherits(TextField, Field);

module.exports = TextField;
