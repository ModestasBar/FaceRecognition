const handleProfile = (req, res, db)=> {
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
}

module.exports = {
    handleProfile: handleProfile
}