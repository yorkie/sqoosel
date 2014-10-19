
var util = require('util');
var Field = require('../field');

function TimestampField(useTimezone) {
  if (!(this instanceof TimestampField))
    return new TimestampField(useTimezone);
  Field.call(this, 'TIMESTAMP');
  this.timezone = useTimezone;
}
util.inherits(TimestampField, Field);

TimestampField.prototype.setDefault = function(val) {
  return Field.prototype.setDefault.call(this, '(' + val + ')');
}

TimestampField.prototype.toString = function() {
  var res = this.base;
  if (!this.useTimezone)
    res += ' WITHOUT TIME ZONE';
  return Field.prototype.toString.call(this, res);
}

module.exports = TimestampField;
