
var sql = require('sql');
var resumer = require('resumer');
var sqoosel = require('./index');
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

Model.prototype.createReadStream = function() {
  return resumer().queue(this.toString());
};

Model.prototype.exec = function exec(callback) {
  var q = this.toQuery();
  sqoosel.getQueryfn(function getQueryFunction(err, query, close) {
    if (err)
      return callback(err);
    query(q.text, q.value, function onresult(err, result) {
      close();
      callback(err, result);
    });
  });
};

module.exports = Model;