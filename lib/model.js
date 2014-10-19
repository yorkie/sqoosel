
var sql = require('sql');
var stream = require('stream');
var sqoosel = require('./index');
var Schema = require('./schema');
var Node = require('sql/lib/node');

var queryfn = function noop () {};

function toString() {
  return [
    'CREATE TABLE IF NOT EXISTS ' + this._name + '(',
      this.sqooselSchema._columnsDetails.join(',\n'),
    ');'
  ].join('\n');
};

function createReadStream() {
  var s = new stream.Readable();
  s._read = function noop() {};
  s.push(this.toString());
  s.push(null);
  return s;
};

// Inject node-sql
Node.prototype.exec = function exec(callback) {
  var q = this.toQuery();
  queryfn(function getQueryfn(err, query, close, ctx) {
    if (err)
      return callback(err);
    query.call(ctx, q.text, q.values, function onresult(err, result) {
      close();
      callback(err, result);
    });
  });
}

module.exports = function(name, schema) {
  if (typeof name !== 'string')
    throw new TypeError('name required');
  if (!(schema instanceof Schema))
    throw new TypeError('schema must be Schema type');

  var defineObj = sql.define({
    'name': name,
    'columns': schema._columns
  });
  defineObj.sqooselSchema = schema;
  defineObj.toString = toString.bind(defineObj);
  defineObj.createReadStream = createReadStream.bind(defineObj);
  return defineObj;
}

module.exports.setQueryFn = function(fn) {
  queryfn = fn;
};
