const errorHandlerMiddleware = (err, _req, res, _next) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(err.code).json({ message: err.message });
    case 'InvalidFieldsError':
      return res.status(err.code).json({ message: err.message });
    default:
      return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandlerMiddleware;