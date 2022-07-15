const runSchema = (schema) => async (unknown) => schema.validateAsync(unknown);

module.exports = {
  runSchema,
};