'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../server');

test('Get root URL!', (t) => {
  request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        t.error(err, 'No error');
        t.end();
      });
});

test('Signin test.', (t) => {
  request(app)
      .post('/signin')
      .send({
        email: 'john@bla.com',
        password: 'blablabla'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        t.equal(res.body, 'Wrong credentials!', 'Sign in with wrong credentials.')
        t.error(err, 'No error');
      });

  request(app)
      .post('/signin')
      .send({
        email: 'john@bla.com',
        password: 'foo'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        t.ok(res.body.id, 'Succesfuly signed in.', 'Signin with correct credentials.')
        t.error(err, 'No error');
      });
});