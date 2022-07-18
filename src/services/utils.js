const serviceUtils = {
  throwInvalidFields(message) {
    const error = new Error(message);
    error.name = 'InvalidFieldsError';
    throw error;
  },

  throwUserExists(message) {
    const error = new Error(message);
    error.name = 'UserAlreadyExistsError';
    throw error;
  },

  throwCategoryExists(message) {
    const error = new Error(message);
    error.name = 'CategoryAlreadyExistsError';
    throw error;
  },

  throwCategoryNotFound(message) {
    const error = new Error(message);
    error.name = 'teste';
    throw error;
  },

  throwUserNotFound(message) {
    const error = new Error(message);
    error.name = 'UserNotFoundError';
    throw error;
  },

  throwTokenNotFound(message) {
    const error = new Error(message);
    error.name = 'TokenNotFoundError';
    throw error;
  },

  throwUnauthorizedError(message) {
    const error = new Error(message);
    error.name = 'UnauthorizedError';
    throw error;
  },
};

module.exports = serviceUtils;