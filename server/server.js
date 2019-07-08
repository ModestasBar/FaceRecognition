const express = require('express');
const bodyParse = require('body-parser');

const app = express();

app.use(bodyParse.json());

const dataBase = {
    users: [
        {
            id: '123',
            name: 'modestas',
            password: 'modestas',
            email: 'mode@gmail.com',
            score: 0,
            date: new Date()
        },
        {
            id: '124',
            name: 'antanas',
            password: 'antanas',
            email: 'antanas@gmail.com',
            score: 0,
            date: new Date()
        }
    ]
}

app.get('/', (req,res)=> {
    res.json(dataBase.users);
})

app.post('/sign', (req, res)=> {
    if(req.body.email === dataBase.users[0].email &&
       req.body.password === dataBase.users[0].password) {
           res.json('success!');
       } else {
           res.json('400 error');
       }
})

app.post('/register', (req, res)=> {
    const{name, password, email} = req.body;

    dataBase.users.push({
        id: '125',
        name: name,
        password: password,
        email: email,
        score: 0,
        date: new Date()
    })
    res.json(dataBase.users[dataBase.users.length-1])
})

app.post('/profile/:id', (req, res)=> {
    const {id} = req.params;
    
    dataBase.users.forEach(user =>{
        if(user.id === id) {
            return res.json(user);
        }
    })
    return res.status(400).json('error');
})

app.put('/image' ,(req, res)=> {
    const {id} = req.body;
    
    dataBase.users.forEach(user =>{
        if(user.id === id) {
            user.score++;
            return res.json(user.score);
        }
    })
    return res.status(400).json('error');
})

app.listen(3000, ()=> {
    console.log('app is running!')
});