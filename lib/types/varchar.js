
var util = require('util');
var Field = require('../field');

function VarCharField(length) {
  if (!(this instanceof VarCharField))
    return new VarCharField(length);
  Field.call(this, 'VARCHAR');
  this.length = length;
}
util.inherits(VarCharField, Field);

VarCharField.prototype.setDefault = function(val) {
  return Field.prototype.setDefault.call(this, val + '');
};

VarCharField.prototype.toString = function() {
  res = this.base;
  if (typeof this.length === 'number') {
    res += '(' + this.length + ')';
  }
  return Field.prototype.toString.call(this, res);
};

module.exports = VarCharField;

