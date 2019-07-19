const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const sign = require('./controller/sign');
const register = require('./controller/register');
const profile = require('./controller/profile');
const image = require('./controller/image')

const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'modestas',
      password : '123',
      database : 'image-recognition'
    }
});


const app = express();

app.use(bodyParse.json());
app.use(cors());

app.get('/', (req,res)=> {
    db.select('*')
    .from('users')
    .returning('*')
    .then(table => res.json(table)
    )
    .catch(err => res.status(400).json('Data base error'))

    
})

app.post('/sign', (req, res) => sign.handleSign(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.post('/profile/:id', (req, res) => profile.handleProfile(req, res, db))

app.put('/image' ,(req, res) => image.handleImage(req, res, db))

app.listen(3000, ()=> {
    console.log('App is running')
});
