/**
* 
* @file     This file imports all the modules belonging to the application and builds the routes in express.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/

const express = require('express');
const app = express();

const ExoplanetRoute = require('./exoplanet/route');
new ExoplanetRoute(app);

module.exports = app;
