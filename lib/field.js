
function Field(base) {
  if (!base)
    throw new Error('base required');
  this.base = base;
  this._default = undefined;
}

Field.prototype.asPrimary = function(asPrimary) {
  this._asPrimary = asPrimary === false ? false : true;
  return this;
};

Field.prototype.setDefault = function(val) {
  this._default = val;
  return this;
};

Field.prototype.required = function(required) {
  this._required = required;
  return this;
};

Field.prototype.reference = function(key) {
  if (!key.table || !key.name)
    throw new TypeError('invalied foreginKey in .reference()');
  this._reference = key;
  return this;
};

Field.prototype.toString = function(val) {
  var res = val || this.base;
  if (this._asPrimary)
    res += ' PRIMARY KEY';
  if (this._required)
    res += ' NOT NULL';
  if (this._reference)
    res += ' REFERENCES ' + this._reference.table._name + '(' + this._reference.name + ')';
  if (this._default !== undefined)
    res += ' DEFAULT ' + this._default;
  return res;
};

module.exports = Field;