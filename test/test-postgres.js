
var fs = require('fs');
var pg = require('pg');
var path = require('path');
var should = require('should');
var sqoosel = require('../');

var Beep = require('./models/beep');
var exec = require('child_process').exec;
var execSQL = Beep.exec;

before(function() {
  sqoosel({
    query: function(exec) {
      pg.connect('postgres://postgres@localhost:5432/ci_test', function(err, client, close) {
        exec(err, client.query, close, client);
      });
    }
  });
});

describe('init db', function() {
  
  after(function() {
    fs.unlinkSync(path.join(__dirname, './postgres.sql'));
  });

  it('init db', function(next) {
    var s = Beep.createReadStream();
    s.on('end', next);
    s.pipe(fs.createWriteStream(path.join(__dirname, './postgres.sql')))
  });

  it('run sql', function(next) {
    exec('psql -d ci_test -U postgres -f ./test/postgres.sql', next);
  });

  it('should create beep instance', function(next) {
    Beep.insert({content: 'yorkie'}).exec(next);
  });

  it('query', function(next) {
    Beep.select().exec(function(err, result) {
      (err === null).should.be.true;
      result.should.have.ownProperty('rowCount').equal(1);
      result.should.have.ownProperty('rows');
      next();
    });
  });

  it('should delete', function(next) {
    Beep.delete().where({'content': 'yorkie'}).exec(next);
  });

});
