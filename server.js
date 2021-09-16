require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const DATABASE_KEY = `${process.env.SERVER_APP_DATABASE_KEY}`;

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '',
      user : 'postgres',
      password :DATABASE_KEY,
      database : 'celebritymatch'
    }
  });

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const attempts = require('./controllers/attempts');
const apiCall = require('./controllers/apiCall');

// knex.select('*').from('users').then(data => console.log(data))

const app = express();



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.send("Success!")})

//advanced function
app.post('/signin', signin.handleSignin(knex, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})  

app.put('/attempts', (req, res) => {attempts.handleAttempts(req, res, knex)})

//image data from url input
app.post('/faceimage', (req, res) => {apiCall.handleFaceApiCall(req, res)})

//celebrity data from url input
app.post('/celebrity', (req, res) => {apiCall.handleCelebrityApiCall(req, res)})

// get profile data
app.get('/profile/:id', (req, res, knex) => {profile.handleProfile(req, res, knex)})

app.listen(3000, () => {
    console.log("App is running on port 3000")
});

