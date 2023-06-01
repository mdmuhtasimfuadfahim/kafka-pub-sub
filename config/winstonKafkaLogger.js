const { logLevel } = require('kafkajs');
const winston = require('winston');

/**
 * Converts a log level from our custom format to the corresponding Winston log level.
 *
 * @param {string} level - The log level to be converted.
 * @return {string} The corresponding Winston log level.
 */
const toWinstonLogLevel = (level) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
    default:
      return 'all';
  }
};

/**
 * Creates a Winston Logger instance with the specified log level and transports.
 *
 * @param {string} logLevel - The log level for the logger instance.
 * @return {function} - A function that can be used to log data with the configured logger.
 *                      The function takes in an object with the following properties:
 *                          - namespace: A namespace for the log.
 *                          - level: The log level for the current log.
 *                          - label: A label for the log.
 *                          - log: An object containing the log data.
 */
// eslint-disable-next-line no-shadow
const WinstonLogCreator = (logLevel) => {
  const logger = winston.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'kafka.log' })],
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    logger.log({
      namespace,
      label,
      level: toWinstonLogLevel(level),
      message,
      extra,
    });
  };
};

module.exports = WinstonLogCreator;
