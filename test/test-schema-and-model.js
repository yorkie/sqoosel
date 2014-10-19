
var assert = require('assert');
var should = require('should');
var sqoosel = require('../');
var types = sqoosel.types;

describe('schema and model', function() {

  var BeepSchema;
  var BeepModel;

  it('define beep schema', function() {
    BeepSchema = new sqoosel.Schema({
      'id': types.integer().asPrimary(),
      'content': types.text()
    });
    BeepSchema.should.have.ownProperty('_columns');
    BeepSchema.should.have.ownProperty('_columnsDetails');
    assert.deepEqual(BeepSchema._columns, ['id', 'content']);
  });

  it('bind a model', function() {
    BeepModel = sqoosel.model('beep', BeepSchema);
    BeepModel.should.have.ownProperty('id');
    BeepModel.should.have.ownProperty('content');
  });

  it('toString', function() {
    BeepModel.toString().should.be.eql([
      'CREATE TABLE IF NOT EXISTS beep(',
      '  id  INT PRIMARY KEY,',
      '  content  TEXT',
      ');'
    ].join('\n'));
  });

  it('readStream', function(done) {
    var val = '';
    var rs = BeepModel.createReadStream();
    rs.on('data', function(data) {
      (data + '').should.be.eql([
        'CREATE TABLE IF NOT EXISTS beep(',
        '  id  INT PRIMARY KEY,',
        '  content  TEXT',
        ');'
      ].join('\n'));
      done();
    });
  });

});