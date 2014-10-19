
var sql = require('sql');
var TAB = '  ';

function Schema(fields) {
  this._fields = fields;
}

Schema.prototype.toColumns = function() {
  var columns = [];
  var key;
  for (key in this._fields)
    columns.push(TAB + key + ' ' + this._fields[key]);
  return columns;
};

module.exports = Schema;