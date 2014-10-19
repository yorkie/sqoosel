
var sql = require('sql');
var Schema = require('./schema');

function Model(name, schema) {
  if (!(this instanceof Model))
    return new Model(name, schema);
  if (typeof name !== 'string')
    throw new TypeError('name required');
  if (!(schema instanceof Schema))
    throw new TypeError('schema must be Schema type');

  return sql.define({
    'name': name,
    'columns': schema._columns
  });
}

Model.prototype.toString = function() {
  return [
    'CREATE TABLE IF NOT EXISTS ' + this.name + '(',
      this._schema._columnsDetails.join(',\n'),
    ');'
  ].join('\n');
};

module.exports = Model;