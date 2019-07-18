const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

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
    res.json(dataBase.users);
})

app.post('/sign', (req, res)=> {
    db('login')
    .select('hash', 'email')
    .where('email', '=', req.body.email)
    .then(data => {
        const isCorrect = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isCorrect) {
            return db.select('*')
            .from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(error => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('Wrong credentials');
        }
    })
    .catch(error => res.status(400).json('Wrong credentials'))
})

app.post('/register', (req, res)=> {
    const{name, password, email} = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error => res.status(404).json('Unable to register'))
})

app.post('/profile/:id', (req, res)=> {
    const {id} = req.params;
    db('users').where('id', '=', id)
    .returning('*')
    .then(user => {
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Error finding a user')
        }
    })

})

app.put('/image' ,(req, res)=> {
    const {id} = req.body;
  
    db('users').where('id', '=', id)
    .returning('entries')
    .increment('entries', 1)
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {res.status(400).json('Error finding entries')})
    
})

app.listen(3000, ()=> {
    console.log('App is running')
});
