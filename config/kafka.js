const { logLevel } = require('kafkajs');
const { Kafka } = require('kafkajs');
const config = require('./config');
const WinstonLogCreator = require('./winstonKafkaLogger');

const kafka = new Kafka({
    clientId: config.kafka_client_id,
    brokers: [config.kafka_broker_url],
    logLevel: logLevel.ERROR,
    logCreator: WinstonLogCreator,
});

module.exports = kafka;