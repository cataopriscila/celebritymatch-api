const handleSignin = (knex, bcrypt) => (req, res) => {
    const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('Incorrect form submission');
        }

    knex.select('email', 'hash')
    .from('login')
    .where('email','=', email)
    .then(user => {
      const isValid = bcrypt.compareSync(password, user[0].hash);
      if(isValid) {
          knex.select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Failed to get user'))           
           } else {
               res.status(400).json('Wrong credentials')
           }
       })
       .catch(err => res.status(400).json('Signin error')) 
}

module.exports = {
    handleSignin: handleSignin
}
