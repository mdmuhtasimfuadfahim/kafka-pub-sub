const kafka = require('./config/kafka');
const config = require('./config/config');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');
const validateData = require('./validation/validateData');
const validateHeaders = require('./validation/validateHeaders');

const consumer = kafka.consumer({ groupId: config.kafka_group_id });

/**
 * An asynchronous function that consumes events from a specified topic.
 * It validates the topic, each message's event and data before returning the message data object.
 *
 * @param {string} topic - The topic to consume events from.
 * @return {Promise<object>} The message data object containing topic, partition, offset, timestamp, key, value, and headers.
 */
const ConsumeEvent = async (topic) => {
  await consumer.connect();
  await consumer.subscribe({ topics: [topic], fromBeginning: true });

  validateTopic(topic);

  return new Promise((resolve, reject) => {
    try {
      consumer.run({
        // eslint-disable-next-line no-shadow
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
          const key = message.key.toString();
          validateEvent(message.key.toString());

          const value = JSON.parse(message.value);
          validateData(value);

          const headers = Object.keys(message.headers).reduce(
            // eslint-disable-next-line no-shadow
            (headers, key) => ({
              ...headers,
              [key]: message.headers[key].toString(),
            }),
            {}
          );
          validateHeaders(headers);
          const data = {
            topic,
            partition,
            offset: message.offset,
            timestamp: message.timestamp,
            key,
            value,
            headers,
          };
          await heartbeat();
          resolve(data);
        },
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = ConsumeEvent;
