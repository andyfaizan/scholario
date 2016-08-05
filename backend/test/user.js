const request = require('supertest');
const should = require('should');


const server = request.agent('http://localhost:3000');


describe('POST /users', function (done) {

});

describe('Login', function (done) {

  it('should fail when password is wrong', function (done) {
    server
      .post('/auth/login')
      .send({ email: 'test@uni-bonn.de', password: 'test' })
  });
});
