const handleProfile = (req, res, knex )=> {
    const { id } = req.params;    
    knex.select('*')
    .from('users')
    .where({id})
    .then(user => {
        if(user.length) {
          res.json(user[0])  
          console.log(user[0]);
        } else {
            res.status(400).json('Not found')
        }        
    })
    .catch(err => res.status(400).json('Error getting user')) 
}

module.exports = {
    handleProfile
}