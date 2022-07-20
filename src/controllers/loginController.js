require('dotenv').config();
const rescue = require('express-rescue');
const JWT = require('jsonwebtoken');
const service = require('../service/index');

const secret = process.env.JWT_SECRET;

module.exports = rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const error = { code: 'required', message: 'Some required fields are missing' };

    if (!email || !password) return next(error); 
 
  const user = await service.login(email);

  if (user.error) return next(user.error);

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

const token = JWT.sign({ data: user }, secret, jwtConfig);

return res.status(200).json({ token });
});
