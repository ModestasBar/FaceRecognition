const handleImage = (req, res, db)=> {
    const {id} = req.body;
  
    db('users').where('id', '=', id)
    .returning('entries')
    .increment('entries', 1)
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {res.status(400).json('Error finding entries')})
}

module.exports = {
    handleImage: handleImage
}