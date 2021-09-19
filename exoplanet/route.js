/**
* 
* @file     This file contains the implementation of routes for the exoplanet module.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/
const Exoplanet = require('./controller');
const exoplanet = new Exoplanet();

/**
 * @class ExoplanetService Defines all the routes for the exoplanet module.
*/
module.exports = class ExoplanetRoutes {
    constructor(app) {
        let baseUrl = '/exoplanet';
        /**
         * @api {get} /exoplanet/orphan Gets all rogue(orphan) exoplanets
         * @apiName GetOrphanPlanets
         * @apiGroup Exoplanet
         *
         * @apiParam {} No parameter is needed.
         *
         * @apiSuccess {Number} orphanPlanetsCount Number of rogue(orphan) exoplanets
         */
        app.get(baseUrl + '/orphan', (req, res) => {
            exoplanet.getOrphanPlanets().then((planets) => {
                let response = {
                    "orphanPlanetsCount": planets.length
                }
                res.send(response);
            }).catch((err)=>{
                next(err);
            });
        });

        /**
         * @api {get} /exoplanet/hottest-star-planet Gets the planet with the hottest host star.
         * @apiName GetHottestStarPlanet
         * @apiGroup Exoplanet
         *
         * @apiParam {} No parameter is needed.
         *
         * @apiSuccess {String} planetIdentifier Identifier of the planethaving the hottest host star.
         */
        app.get(baseUrl + '/hottest-star-planet', (req, res) => {
            exoplanet.getHottestStarPlanet().then((planet) => {
                let response = {
                    "planetIdentifier": planet["PlanetIdentifier"]
                }
                res.send(response);
            }).catch((err)=>{
                next(err);
            });
        });

        /**
         * @api {get} /exoplanet/timeline Gets the timeline of the number of planets discovered per year grouped by size
         * @apiName GetDiscoveryTimeline
         * @apiGroup Exoplanet
         *
         * @apiParam {} No parameter is needed.
         *
         * @apiSuccess {Array} timeline Identifier of the planethaving the hottest host star.
         */
        app.get(baseUrl + '/timeline', (req, res, next) => {
            exoplanet.getDiscoveryTimeline().then((timeline) => {
                let response = {
                    "timeline": timeline
                }
                res.send(response);
            }).catch((err)=>{
                next(err);
            });
        });
    }
}
