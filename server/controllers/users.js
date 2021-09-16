// Users controller

const db = require('../models');
//const User = require('../models/User');
//const createJWT = require('./helpers');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const Joi = require('joi');

// Index - GET - Presentational (all of one resource)
const index = async (req, res) => {
  const users = await db.User.find({});
  console.log('users');
  console.log(users);
  res.json(users);
};

const create = (req, res) => {
  console.log('body');

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  }).options({ abortEarly: false });

  const { value, error } = schema.validate(req.body);
  console.log(value, error);

  if (error) {
    res.status(400).send({
      error: error.details.map((d) => d.message),
    });
  }

  db.User.create(req.body, (err, savedUser) => {
    if (err) return console.log('Error in User#create:', err);

    const token = createJWT(savedUser);
    return res.status(201).json({
      message: 'Success',
      data: { token },
    });
  });
};

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = { index, create };
