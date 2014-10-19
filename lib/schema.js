
function Schema(fields) {
  var self = this;
  self._fields = fields;
  self._columns = [];
  self._columnsDetails = [];

  for (var key in fields) {
    var val = fields[key];
    self._columns.push(key);
    self._columnsDetails.push('  ' + key + '  ' + val);
  }
}

module.exports = Schema;