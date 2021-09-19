/**
* 
* @file     This file contains the implementation of controller for the exoplanet module.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/

const ExoplanetService = require('./service');
const exoplanetService = new ExoplanetService();

/**
 * @class Exoplanet Defines the necessary functions for exoplanet module. 
 * All the functions uses the service file to call the external API to fetch the information of all the planets
*/
module.exports = class Exoplanet {
    /**
     * @function getOrphanPlanets Gets all rogue(orphan) planets
     * @returns {Promise<planet[]>}
     */
    getOrphanPlanets() {
        return new Promise((resolve, reject) => {
            exoplanetService.getPlanets().then((planets) => {
                let orphanPlanets = planets.filter((elem) => {
                    return elem['TypeFlag'] == 3;
                });
                resolve(orphanPlanets);
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * @function getHottestStarPlanet Gets the planet with the hottest star
     * @returns {Promise<planet>}
     */
    getHottestStarPlanet() {
        return new Promise((resolve, reject) => {
            exoplanetService.getPlanets().then((planets) => {
                let hottestStarPlanet = {};
                let hottestStarTemp = -Infinity;
                for (let i = 0; i < planets.length; i++) {
                    if (typeof planets[i]["HostStarTempK"] == 'number' && hottestStarTemp < planets[i]["HostStarTempK"]) {
                        hottestStarPlanet = planets[i];
                        hottestStarTemp = planets[i]["HostStarTempK"];
                    }
                }
                resolve(hottestStarPlanet);
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * @function getDiscoveryTimeline A timeline of the number of planets discovered per year grouped by size.
     * @returns {Promise<timeline[]>}
     */
    getDiscoveryTimeline() {
        return new Promise((resolve, reject) => {
            exoplanetService.getPlanets().then((planets) => {
                let timeline = {};
                for (let i = 0; i < planets.length; i++) {
                    let planetSize = 'large';
                    if (planets[i]['RadiusJpt'] == '' || planets[i]['DiscoveryYear'] == '') {
                        continue;
                    }
                    if (planets[i]['RadiusJpt'] < 1) {
                        planetSize = 'small';
                    } else if (planets[i]['RadiusJpt'] < 2) {
                        planetSize = 'medium';
                    }
                    if (!timeline.hasOwnProperty(planets[i]['DiscoveryYear'])) {
                        timeline[planets[i]['DiscoveryYear']] = {};
                    }
                    if (!timeline[planets[i]['DiscoveryYear']].hasOwnProperty(planetSize)) {
                        timeline[planets[i]['DiscoveryYear']][planetSize] = 0;
                    }
                    timeline[planets[i]['DiscoveryYear']][planetSize] += 1;
                }
                let timelineArray = [];
                for (var discoveryYear in timeline) {
                    timeline[discoveryYear]['discoveryYear'] = parseInt(discoveryYear);
                    timelineArray.push(timeline[discoveryYear]);
                }
                timelineArray.sort((a, b) => { return a['discoveryYear'] > b['discoveryYear'] ? 1 : -1; });
                resolve(timelineArray);
            }).catch(() => {
                reject();
            });
        });
    }
}
