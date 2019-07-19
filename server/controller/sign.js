const handleSign = (req, res, db, bcrypt)=> {
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
}

module.exports = {
    handleSign: handleSign
}