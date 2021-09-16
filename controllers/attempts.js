const handleAttempts = (req, res, knex) => {
  const { id } = req.body;
  knex("users")
    .returning("entries")
    .where("id", "=", id)
    .increment("entries", 1)
    .then((entries) => res.json(entries[0]))
    .catch(err => res.status(400).json("Error on adding attempt value"));
};

module.exports = {
  handleAttempts  
};
