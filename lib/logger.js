/**
* 
* @file     This file defines the application wide logger module, and it internally uses winston module to achieve the functionality.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/
const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: config["LOG_FILE"] })
  ]
});

module.exports = logger;
