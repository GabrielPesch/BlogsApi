const serviceUtils = {
  throwInvalidFields(message) {
    const error = new Error(message);
    error.name = 'InvalidFieldsError';
    error.code = 400;
    throw error;
  },

  throwUserExists(message) {
    const error = new Error(message);
    error.name = 'UserAlreadyExistsError';
    error.code = 409;
    throw error;
  },
};

module.exports = serviceUtils;