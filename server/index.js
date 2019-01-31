'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// routes
const register = require('../controllers/register');
const signin = require('../controllers/signin');
const profile = require('../controllers/profile');
const image = require('../controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'el-dev01',
    user : 'postgres',
    password : process.env.PGPW,
    database : 'facerecognitioneye'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json('Welcome to the facerecognitioneye!');
})

app.get('/profile/:id', profile.handleProfile(db));

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt));

app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => image.handleImageurl(req, res));

const closeConnection = () => {
  console.log('close the connection!');
}

module.exports = app;

/*
/ --> res = this working
/signin           --> POST = success/fail
/register         --> POST = user
/profile/:userid  --> GET = user
/image            --> PUT = updated user
*/