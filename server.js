/**
* This file imports the app module and starts the node server on the port defined in the configuration file.
* @file     This file is the entry point of the application.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/

const app = require('./lib/app');
const config = require('./lib/config');
const logger = require('./lib/logger');

app.use(function (req, res, next) {
  res.status(404).send({ "status": "error", "message": "Resource not found." });
})

app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(500).send({ "status": "error", "message": "Internal server error." });
})

let server;
server = app.listen(config['PORT'], () => {
  logger.info(`Listening to port ${config['PORT']}`);
});


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
