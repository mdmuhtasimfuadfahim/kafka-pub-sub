const { Partitioners } = require('kafkajs');
const kafka = require('./config/kafka');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');
const validateData = require('./validation/validateData');
const validateHeaders = require('./validation/validateHeaders');

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
});

/**
 * Asynchronously produces an event for a given topic with optional data.
 *
 * @param {string} topic - the topic to produce the event to.
 * @param {string} event - the name of the event being produced.
 * @param {Object} [data={}] - optional data to include with the event.
 * @param {Object} [headers={}] - optional headers to include with the message.
 * @return {Promise} a promise that resolves when the message is sent successfully.
 * @throws {string} an error message if message sending fails.
 */
const ProduceEvent = async (topic, event, data = {}, headers = {}) => {
    // basic validations
    validateTopic(topic);
    validateEvent(event);
    validateData(data);
    validateHeaders(headers);

    await producer.connect();

    return new Promise(async (resolve, reject) => {
        try {
            const message = [{
                key: `key-${event}`,
                value: JSON.stringify({ data }),
                headers,
            }];

            const response = await producer.send({
                topic,
                messages: message,
            });

            await producer.disconnect();
            resolve(response);
        } catch (error) {
            await producer.disconnect();
            reject(error.message);
        }
    });
};

module.exports = ProduceEvent;