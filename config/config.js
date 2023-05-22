const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    KAFKA_CLIENT_ID: Joi.string().required().description('kafka client id'),
    KAFKA_BROKER_URL: Joi.string().required().description('kafka broker url'),
    KAFKA_GROUP_ID: Joi.string().required().description('kafka group id'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error For Kafka: ${error.message}`);
}

module.exports = {
  kafka_client_id: envVars.KAFKA_CLIENT_ID,
  kafka_broker_url: envVars.KAFKA_BROKER_URL,
  kafka_group_id: envVars.KAFKA_GROUP_ID,
};
