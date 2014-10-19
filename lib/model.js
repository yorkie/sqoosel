
var Schema = require('./schema');

function Model(name, schema) {
  if (!(this instanceof Model))
    return new Model(name, schema);
  if (typeof name !== 'string')
    throw new TypeError('name required');
  if (!(schema instanceof Schema))
    throw new TypeError('schema must be Schema type');

  this.name = name;
  this._schema = schema;
}

Model.prototype.toString = function() {
  var columns = this._schema.toColumns();
  return [
    'CREATE TABLE IF NOT EXISTS ' + this.name + '(',
      columns.join(',\n'),
    ');'
  ].join('\n');
};

module.exports = Model;