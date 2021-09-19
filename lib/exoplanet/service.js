/**
* 
* @file     This file defines the service class necessary for the controllers in the exoplanet module.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/
const request = require('request');
const config = require('../config');

/**
 * @class ExoplanetService Defines the services that does external API calls required for the exoplanet module.
*/
module.exports = class ExoplanetService {
    constructor() {
        this.data_url = config.EXOPLANET_DATA_URL
    }

    /**
     * @function getPlanets Gets all planets from an API endpoint.
     * @returns {Promise<planet[]>}
     */
    getPlanets() {
        return new Promise((resolve, reject) => {
            request(this.data_url, {
                json: true
            }, (err, httpRes, body) => {
                resolve(body);
            });
        });
    }
}
