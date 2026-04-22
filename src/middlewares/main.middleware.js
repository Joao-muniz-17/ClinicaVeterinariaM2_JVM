const logger             = require('./logger.middleware');
const autenticar         = require('./auth.middleware');
const errorHandler       = require('./errorHandler.middleware');

module.exports = {
  logger,
  autenticar,
  errorHandler,
};