// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', function(req, res) {
  // console.log(req);
  res.status(200).type('json').send({
    "desc": "returns all lions",
    "data": lions
  });
});

app.get('/lions/:id', function(req, res) {
  console.log(req.params.id);
  res.status(200).type('json').send({
    "desc": "returns one lion represented by its id",
    "data": _.find(lions, function(lion) {
        return lion.id == req.params.id; 
    }) || {}
  });
});

app.post('/lions', function(req, res) {
  // console.log(req);
  var newLion = req.body;
  newLion.id = id + '';
  id++;
  console.log(newLion);
  lions.push(newLion);
  res.status(200).type('json').json({
    "desc": "create and returns a new lion using the posted object as the lion",
    "data": newLion
  });
});

app.put('/lions/:id', function(req, res){
  var foundLion;
  lions  = _.map(lions, function(lion) {
    if (lion.id == req.params.id) {
      foundLion = lion;
      return req.body;
    }
    return lion;
  });
  res.status(200).type('json').send({
    "desc": "updates and returns the matching lion with the posted update objec",
    "data": foundLion || {}
  });
});

app.delete('/lions/:id', function(req, res) {
  var foundLion = _.remove(lions, function(lion) {
    return lion.id = req.params.id;  
  })[0];
  res.status(200).type('json').send({
    "desc": "deletes and returns the matching lion",
    "data": foundLion || []
  });

});


app.listen(3000);
console.log('on port 3000');
