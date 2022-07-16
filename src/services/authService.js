const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  async makeToken(user) {
    const { password, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser }, secret);
    return token;
  },

  async readToken(token) {
    try {
      const { data } = jwt.verify(token, secret);
    return data;
    } catch (error) {
      throwUnauthorizedError('Expired or invalid token');
    }
  },

};

module.exports = authService;