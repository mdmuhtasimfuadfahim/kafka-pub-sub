const Joi = require('joi');

/**
 * Validates a kafka produced topic.
 *
 * @param {string} topic - The topic to be validated.
 * @throws {Error} Invalid topic: The type of topic should be string or the length should not be less than 5 and more than 20.
 */
const validateTopic = (topic) => {
  const pubSubTopic = { topic };

  const pubSubTopicSchema = Joi.object()
    .keys({
      topic: Joi.string().min(5).max(20).required().description('kafka produced topic'),
    })
    .unknown();

  const { error } = pubSubTopicSchema.prefs({ errors: { label: 'key' } }).validate(pubSubTopic);

  if (error) {
    throw new Error(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  }
};

module.exports = validateTopic;
