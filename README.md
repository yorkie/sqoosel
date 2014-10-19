
Sqoosel
============================

SQL-based Application Framework for Node.js

[![NPM](https://nodei.co/npm/sqoosel.png?stars&downloads)](https://nodei.co/npm/sqoosel/)
[![NPM](https://nodei.co/npm-dl/sqoosel.png)](https://nodei.co/npm/sqoosel/)

### Installation

```sh
$ npm install sqoosel --save
```

### Usage

1. Define your SQL engine

```js
var sqoosel = require('sqoosel');
sqoosel({
  // this function will be called in your every query to your SQL-based database
  query: function(exec) {
    pg.connect('postgres://postgres@localhost:5432/ci_test', function(err, client, close) {
      exec(err, client.query, close, client);
    });
  }
});
```

The passing callback `exec` will receive 4 arguments, then they are: `exec(err, queryfn, closefn, client)`.

2. Define your schema and model

```js
var sqoosel = require('sqoosel');
var UserSchema = new sqoosel.Schema({
  'id': sqoosel.types.bigserial().asPrimary(),
  'username': sqoosel.types.char(128).required(),
  'password': sqoosel.types.char(256).required(),
  'createDate': sqoosel.types.timestamp().setDefault('now()')
});

module.exports = sqoosel.model('user', UserSchema);
```
So close to [mongoose](https://github.com/mongoose/mongoose) ?

3. Using your model in your controller or anywhere that you want to use

```js
var User = require('../find/your/model');

router.get('/register/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  // encoding your infomation or other business logic
  // ...

  User.insert({username: username, password: password})
    .exec(function(err, result) {
      // this function's arguments will depend on engine, your sql library, here we are using node-postgres
      if (err)
        res.status(500).end();
      else
        res.status(200).end();
    });
});
```

For more function-based SQL generation, you should move forward to [brianc/node-sql](https://github.com/brianc/node-sql)

4. It's SQL database, we need to apply your schemas, very simple to call `createReadStream` with your model

Now show you howto generate `.sql` init script:

```js
// load your models
var User = require('../find/your/model');
User.createReadStream().pipe(fs.createWriteStream('/path/to/your/sql/file'));
```

Then you will get the `.sql` script like:

```sql
CREATE TABLE IF NOT EXIST user(
  ...
);
```

How to pipe multiple models to one file? [dominictarr/event-stream](https://github.com/dominictarr/event-stream) is the anwser:

```js
var es = require('event-stream');
es.merge(
  Model1.createReadStream(),
  Model2.createReadStream(),
  ...
).pipe(fs.createWriteStream('/path/to/your/sql/file'));
```

If you want to check your SQL schema string, `toString` are available for you as well:

```js
var Model = require('...');
console.log(Model.toString());
```

### License 

MIT
