const Joi = require('joi');

/**
 * Validates a kafka produced event.
 *
 * @param {string} event - The event to be validated.
 * @throws {Error} Invalid event: The type of event should be string or the length should not be less than 5 and more than 20.
 */
const validateEvent = (event) => {
  const pubSubEvent = { event };

  const pubSubEventSchema = Joi.object()
    .keys({
      event: Joi.string().min(5).max(20).required().description('kafka produced event'),
    })
    .unknown();

  const { error } = pubSubEventSchema.prefs({ errors: { label: 'key' } }).validate(pubSubEvent);

  if (error) {
    throw new Error(
      'Invalid event: The type of event should be string or the lenght should not be less than 5 and more than 20'
    );
  }
};

module.exports = validateEvent;
