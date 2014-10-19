
function Schema(fields) {
  var self = this;
  self._fields = fields;
  self._columns = [];
  self._columnsDetails = [];

  for (var key in fields) {
    var val = fields[key];
    self._columns.push(key);
    self._columnsDetails.push('  ' + key + '  ' + val);
    setToProperty(self, key);
  }
}

function setToProperty(self, key) {
  Object.defineProperty(self, key, {
    get: function() {
      if (!self.model || !self.model.name)
        throw new Error('schema should bind a model');
      return {
        name: key,
        model: self.model
      };
    },
    set: function() {
      throw new Error('you cannot set this property');
    }
  });
}

module.exports = Schema;