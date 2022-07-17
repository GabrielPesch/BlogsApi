const authService = require('../services/authService');

const authorizationMiddleware = {
  async validate(data) {
    const token = await authService.validateAuthorization(data);
    await authService.readToken(token);
  },
}; 

module.exports = authorizationMiddleware;