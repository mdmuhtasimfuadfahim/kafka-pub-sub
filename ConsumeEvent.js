const kafka = require('./config/kafka');
const config = require('./config/config');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');
const validateData = require('./validation/validateData');

const consumer = kafka.consumer({ groupId: config.kafka_group_id });

/**
 * Consume a message from a specified topic and return the consumed data.
 *
 * @param {string} topic - the topic to consume from
 * @return {Promise<Object>} the consumed data, including topic, partition, offset, timestamp, key, and value
 */
const ConsumeEvent = async (topic) => {
    await consumer.connect();
    await consumer.subscribe({ topics: [topic], fromBeginning: true });

    //basic validations
    validateTopic(topic);

    return new Promise(async (resolve, reject) => {
        try {
            await consumer.run({
                /**
                 * Iterates over each message and validates the event and data before returning the message data.
                 *
                 * @param {object} message - The message object containing key and value to be validated.
                 * @param {function} heartbeat - The function to be executed after each message is processed.
                 * @return {Promise<object>} The message data object containing topic, partition, offset, timestamp, key, and value.
                 */
                eachMessage: async ({ topic, partition, message, heartbeat }) => {
                    validateEvent(message.key.toString());
                    validateData(JSON.parse(message.value));

                    const data = {
                        topic: topic,
                        partition: partition,
                        offset: message.offset,
                        timestamp: message.timestamp,
                        key: message.key.toString(),
                        value: JSON.parse(message.value),
                    };

                    await heartbeat();
                    resolve(data);
                },
            })
        } catch (error) {
            return reject(error.message);
        }
    });
}

module.exports = ConsumeEvent;