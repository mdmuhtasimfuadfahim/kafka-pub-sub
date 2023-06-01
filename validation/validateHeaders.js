const Joi = require('joi');

/**
 * Validates a kafka produced headers.
 *
 * @param {string} headers - The headers to be validated.
 * @throws {Error} Invalid headers: The type of headers should be a object.
 */
const validateHeaders = (headers) => {
  if (!headers) {
    throw new Error('Invalid headers: No headers found');
  }

  const pubSubheadersSchema = Joi.object().keys().unknown();

  const { error } = pubSubheadersSchema.prefs({ errors: { label: 'key' } }).validate(headers);

  if (error) {
    throw new Error('Invalid headers: The type of headers should be object');
  }
};

module.exports = validateHeaders;
