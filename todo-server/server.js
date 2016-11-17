var express = require('express');
var cors = require('cors');
var _ = require('underscore');
var app = express();
app.use(cors());
var server = require('http').createServer(app);
var session = require('cookie-session');
var config = require('./lib/config');
var redis = require("redis");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var async;

var client = null;

if(config.env == 'development') {
  client = redis.createClient(6380);
} else {
  throw 'Not sure how to connect to redis.';
}

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));app.use(session({secret: guid()}));

var json = function(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  if(typeof data === 'string') res.write(data);

  else res.write(JSON.stringify(data));

  res.end();
};

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

app.get('/todos', function(req, res) {
  client.hgetall('todos', function (err, data) {
    var resultArray = [];
    for(var key in data) {
      resultArray.push({guid: key, description: data[key]});
    }
    json(res, resultArray);
  });

});

app.post('/todos', function(req, res) {
  var id = guid();
  client.hset('todos', id, req.body.description);
  console.log('todos: ' + id + ', ' + req.body.description);
  json(res, { guid: id, description: req.body.description });

});

app.put('/todos', function(req, res) {
  client.hset('todos', req.body.guid, req.body.description);
  json(res, {guid: req.body.guid, description: req.body.description});
});

app.delete('/todos/:guid', function(req, res) {
  var guid = req.params.guid;
  client.hdel('todos', guid);
  json(res, {});

});

server.listen(process.env.PORT || config.port);
