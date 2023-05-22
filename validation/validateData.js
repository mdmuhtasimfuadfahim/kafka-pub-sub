const Joi = require('joi');

/**
 * Validates a kafka produced data.
 *
 * @param {string} data - The data to be validated.
 * @throws {Error} Invalid data: The type of data should be string or the length should not be less than 5 and more than 20.
 */
const validateData = (data) => {

    const pubSubDataSchema = Joi.object()
        .keys()
        .unknown();

    const { error } = pubSubDataSchema.prefs({ errors: { label: 'key' } }).validate(data);

    if (error) {
        throw new Error("Invalid data: The type of data should be object");
    }
};

module.exports = validateData;