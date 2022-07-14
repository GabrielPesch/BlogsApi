const { User } = require('../database/models');
const serviceUtils = require('./utils');

const usersService = {
  async VerifyEmailAndPassword(data) {
    const user = await User.findOne({
      where: data,
      raw: true,
    });
    if (!user) serviceUtils.throwInvalidFields('Invalid fields');
    return user;
  },
};

module.exports = usersService;