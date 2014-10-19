
var util = require('util');
var Field = require('../field');

function CharField(length) {
  if (!(this instanceof CharField))
    return new CharField(length);
  Field.call(this, 'CHAR');
  this.length = length;
}
util.inherits(CharField, Field);

CharField.prototype.setDefault = function(val) {
  return Field.prototype.setDefault.call(this, val + '');
};

CharField.prototype.toString = function() {
  res = this.base;
  if (typeof this.length === 'number') {
    res += '(' + this.length + ')';
  }
  return Field.prototype.toString.call(this, res);
};

module.exports = CharField;

