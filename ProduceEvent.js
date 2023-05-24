const { Partitioners } = require('kafkajs');
const kafka = require('./config/kafka');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');
const validateData = require('./validation/validateData');

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
});

/**
 * Asynchronously produces an event for a given topic with optional data.
 *
 * @param {string} topic - the topic to produce the event to.
 * @param {string} event - the name of the event being produced.
 * @param {Object} [data={}] - optional data to include with the event.
 * @return {Promise} a promise that resolves when the message is sent successfully.
 * @throws {string} an error message if message sending fails.
 */
const ProduceEvent = async (topic, event, data = {}) => {
    // basic validations
    validateTopic(topic);
    validateEvent(event);
    validateData(data);

    await producer.connect();

    return new Promise(async (resolve, reject) => {
        try {
            await producer.send({
                topic,
                messages: [
                    {
                        key: `key-${event}`,
                        value: JSON.stringify({
                            data
                        }),
                    },
                ],
            }).then(response => {
                resolve(response);
            })
            await producer.disconnect();
        } catch (error) {
            await producer.disconnect();
            return reject(error.message);
        }
    });
};

module.exports = ProduceEvent;