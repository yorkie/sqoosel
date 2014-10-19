

var sqoosel = require('../../');
var types = sqoosel.types;

var BeepSchema = new sqoosel.Schema({
  'id': types.bigserial().asPrimary(),
  'content': types.text().setDefault()
});

module.exports = sqoosel.model('beep', BeepSchema);
