require('dotenv').config();
const rescue = require('express-rescue');
const JWT = require('jsonwebtoken');
const Joi = require('joi');
const service = require('../service/index');

const secret = process.env.JWT_SECRET;

const create = rescue(async (req, res, next) => {
    const { error } = Joi.object({
        displayName: Joi.string().required().min(8),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        image: Joi.string(),
    }).validate(req.body);

    if (error) return next(error);

    const user = await service.user.create(req.body);

  if (user.error) return next(user.error);

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

const token = JWT.sign({ data: user }, secret, jwtConfig);

return res.status(201).json({ token });
});

module.exports = {
    create,
};