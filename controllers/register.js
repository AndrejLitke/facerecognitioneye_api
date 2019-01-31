const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission!');
  }

  let saltedHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  db.transaction(trx => {
    trx.insert({
      email: email,
      hash: saltedHash
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .catch(err => res.status(400).json('Unable to register!'));
}

module.exports = {
  handleRegister: handleRegister
};