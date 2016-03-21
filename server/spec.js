var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function(){
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      })
  });
});

describe('GET ONE', function(){
  var lion = {
        name: "Simba",
        age: 3,
        pride: "the cool cats",
        gender: "male",
        id: 3
      };

  thisRequest = request.agent(app);
  before(function(done){
    thisRequest 
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (res) {
          console.log(res.body); 
          done();
        }
      });
  });

  it('should get one lion', function(done) {
    thisRequest
      .get('/lions/3')
      // .send({id: 3})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.name).to.equal(lion.name);
        done();
      })
  });
});
