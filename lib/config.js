/**
* 
* @file     This file uses the environment veriables by dotenv to create configuration object for the application.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname,'../', '.env') });

module.exports = process.env
