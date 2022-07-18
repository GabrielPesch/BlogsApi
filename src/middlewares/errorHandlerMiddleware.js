const errors = {
  ValidationError: 400,
  InvalidFieldsError: 400,
  CategoryNotFoundError: 400,
  throwPostNotFoundError: 404,
  TokenNotFoundError: 401,
  UnauthorizedError: 401,
  UserNotFoundError: 404,
  UserAlreadyExistsError: 409,
};

/**
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;