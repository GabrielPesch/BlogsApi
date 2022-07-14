const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  async makeToken(user) {
    const { password, ...restOfUser } = user;
    const token = jwt.sign({ data: restOfUser }, secret);
    return token;
  },

  async readToken(token) {
    const { data } = jwt.decode(token, secret);
    return data;
  },

};

module.exports = authService;