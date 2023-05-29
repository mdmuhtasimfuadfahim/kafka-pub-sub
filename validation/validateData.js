const Joi = require('joi');

/**
 * Validates a kafka produced data.
 *
 * @param {string} data - The data to be validated.
 * @throws {Error} Invalid data: The type of data should be an object.
 */
const validateData = (data) => {

    if(!data) {
        throw new Error("Invalid data: No data found to produce");
    }

    const pubSubDataSchema = Joi.object()
        .keys()
        .unknown();

    const { error } = pubSubDataSchema.prefs({ errors: { label: 'key' } }).validate(data);

    if (error) {
        throw new Error("Invalid data: The type of data should be object");
    }
};

module.exports = validateData;
