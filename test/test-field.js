
var Field = require('../').Field;
var should = require('should');

describe('field', function() {

  var newfield = null;
  var mockrefs = {
    table: { _name: 'beep' },
    name: 'bump'
  };

  it('create field', function() {
    var expectedval = 'abc';
    newfield = Field('LOL').setDefault(expectedval);
    newfield.should.have.ownProperty('base').equal('LOL');
    newfield.should.have.ownProperty('_default').equal(expectedval);
  });

  it('set as primary key', function() {
    newfield.asPrimary();
    newfield.should.have.ownProperty('_asPrimary').equal(true);
    newfield.toString().should.be.eql('LOL PRIMARY KEY DEFAULT abc');
    newfield.asPrimary(false);
    newfield.should.have.ownProperty('_asPrimary').equal(false);
    newfield.toString().should.be.eql('LOL DEFAULT abc');
  });

  it('set required', function() {
    newfield.required();
    newfield.should.have.ownProperty('_required').equal(true);
    newfield.toString().should.be.eql('LOL NOT NULL DEFAULT abc');
    newfield.required(false);
    newfield.should.have.ownProperty('_required').equal(false);
    newfield.toString().should.be.eql('LOL DEFAULT abc');
  });

  it('refs the mock field', function() {
    newfield.reference(mockrefs);
    newfield.should.have.ownProperty('_reference').equal(mockrefs);
    newfield.toString().should.be.equal('LOL REFERENCES beep(bump) DEFAULT abc');
    delete mockrefs['table'];
    (function() {
      newfield.reference(mockrefs);
    }).should.throw();
  });

});