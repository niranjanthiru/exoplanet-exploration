/**
* 
* @file     This file includes jasmine unit test cases for the exoplanet module.
* @author   Niranjan Thirusangu <niranjanthirusangu@gmail.com>
* @since    09/19/2021
*/

describe("getPlanets()", () => {
    const proxyquire = require('proxyquire');

    describe("when there is no rogue(orphan) planet", () => {
        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "KOI-1843.03",
            "TypeFlag": 0,
        }, {
            "PlanetIdentifier": "Kepler-34 (AB) b",
            "TypeFlag": 1,
        }, {
            "PlanetIdentifier": "EPIC 201828749 b",
            "TypeFlag": 2,
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with an empty array", (done) => {
            exoplanet.getOrphanPlanets().then((planets) => {
                expect(planets).toEqual([]);
                done();
            });
        });
    });

    describe("when there are rogue(orphan) planets with other planets", () => {
        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "KOI-1843.03",
            "TypeFlag": 0,
        }, {
            "PlanetIdentifier": "Kepler-34 (AB) b",
            "TypeFlag": 1,
        }, {
            "PlanetIdentifier": "EPIC 201828749 b",
            "TypeFlag": 2,
        }, {
            "PlanetIdentifier": "PSO J318.5-22",
            "TypeFlag": 3,
        }, {
            "PlanetIdentifier": "CFBDSIR2149",
            "TypeFlag": 3,
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should get only the rogue(orphan) planets", (done) => {
            exoplanet.getOrphanPlanets().then((planets) => {
                let expectedResponse = testPlanets.filter((planet) => { return planet['TypeFlag'] == 3; });
                expect(planets).toEqual(expectedResponse);
                done();
            });
        });
    });

    describe("when the there is an error accesing the external API", () => {
        let exoplanet;
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        reject();
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });
        it("should respond with an error", (done) => {
            exoplanet.getOrphanPlanets().catch(() => {
                done();
            });
        });

    });
});

describe("getHottestStarPlanet()", () => {
    const proxyquire = require('proxyquire');

    describe("when the information for host start's temperature is not available for any planets", () => {
        let exoplanet;
        let testPlanets = [{
            //     "PlanetIdentifier": "KOI-1843.03",
            //     "TypeFlag": 0,
            //     "HostStarTempK": 3584,
            // }, {
            "PlanetIdentifier": "Kepler-34 (AB) b",
            "TypeFlag": 1,
            "HostStarTempK": "",
        }, {
            //     "PlanetIdentifier": "EPIC 201828749 b",
            //     "TypeFlag": 2,
            //     "HostStarTempK": 5552,
            // }, {
            "PlanetIdentifier": "PSO J318.5-22",
            "TypeFlag": 3,
            "HostStarTempK": "",
        }, {
            "PlanetIdentifier": "CFBDSIR2149",
            "TypeFlag": 3,
            "HostStarTempK": "",
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with an empty object", (done) => {
            exoplanet.getHottestStarPlanet().then((hottestStarPlanet) => {
                expect(hottestStarPlanet).toEqual({});
                done();
            });
        });
    });

    describe("when the information for host start's temperature is available for some of the planets", () => {
        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "KOI-1843.03",
            "TypeFlag": 0,
            "HostStarTempK": 3584,
        }, {
            "PlanetIdentifier": "Kepler-34 (AB) b",
            "TypeFlag": 1,
            "HostStarTempK": "",
        }, {
            "PlanetIdentifier": "EPIC 201828749 b",
            "TypeFlag": 2,
            "HostStarTempK": 5552,
        }, {
            "PlanetIdentifier": "PSO J318.5-22",
            "TypeFlag": 3,
            "HostStarTempK": "",
        }, {
            "PlanetIdentifier": "CFBDSIR2149",
            "TypeFlag": 3,
            "HostStarTempK": "",
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with the planet with the hottest star", (done) => {
            exoplanet.getHottestStarPlanet().then((hottestStarPlanet) => {
                expect(hottestStarPlanet['HostStarTempK']).toEqual(5552);
                done();
            });
        });
    });

    describe("when the there is an error accesing the external API", () => {
        let exoplanet;
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        reject();
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with an error", (done) => {
            exoplanet.getHottestStarPlanet().catch(() => {
                done();
            });
        });
    });
});

describe("getDiscoveryTimeline()", () => {
    const proxyquire = require('proxyquire');

    describe("when the discovery year information is not available for any planets", () => {

        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "HD 100546 c",
            "DiscoveryYear": "",
        }, {
            "PlanetIdentifier": "KOI-1843.01",
            "RadiusJpt": 0.114,
            "DiscoveryYear": "",
        }, {
            "PlanetIdentifier": "KOI-1843.02",
            "RadiusJpt": 0.071,
            "DiscoveryYear": "",
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with an empty array", (done) => {
            exoplanet.getDiscoveryTimeline().then((discoveryTimeline) => {
                expect(discoveryTimeline).toEqual([]);
                done();
            });
        });
    });

    describe("when the discovery year information is available for some planets", () => {

        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "KOI-1843.03",
            "RadiusJpt": 0.054,
            "DiscoveryYear": 2012,
        }, {
            "PlanetIdentifier": "Kepler-431 b",
            "RadiusJpt": 0.0682,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "KOI-1843.01",
            "RadiusJpt": 0.114,
            "DiscoveryYear": "",
        }, {
            "PlanetIdentifier": "KOI-1843.02",
            "RadiusJpt": 0.071,
            "DiscoveryYear": "",
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should consider only those planets for counting", (done) => {
            exoplanet.getDiscoveryTimeline().then((discoveryTimeline) => {
                expect(discoveryTimeline).toEqual([{ "discoveryYear": 2012, "small": 1 }, { "discoveryYear": 2015, "small": 1 }]);
                done();
            });
        });
    });

    describe("when the discovery year and radius information is available for some planets", () => {

        let exoplanet;
        let testPlanets = [{
            "PlanetIdentifier": "KOI-1843.03",
            "RadiusJpt": 0.054,
            "DiscoveryYear": 2012,
        }, {
            "PlanetIdentifier": "Kepler-29 b",
            "RadiusJpt": 0.328069,
            "DiscoveryYear": 2012,
        }, {
            "PlanetIdentifier": "Kepler-431 b",
            "RadiusJpt": 0.0682,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "KELT-10 b",
            "RadiusJpt": 1.399,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "KELT-10 b-twin",
            "RadiusJpt": 1.399,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "KOI-201.01",
            "RadiusJpt": 0.82,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "alf Tau b",
            "RadiusJpt": "",
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "alf Tau b-large",
            "RadiusJpt": 2.31,
            "DiscoveryYear": 2015,
        }, {
            "PlanetIdentifier": "KOI-1843.01",
            "RadiusJpt": 0.114,
            "DiscoveryYear": "",
        }, {
            "PlanetIdentifier": "KOI-1843.02",
            "RadiusJpt": 0.071,
            "DiscoveryYear": "",
        }];
        beforeEach(function () {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        resolve(testPlanets);
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should properly aggregate by year", (done) => {
            exoplanet.getDiscoveryTimeline().then((discoveryTimeline) => {
                expect(discoveryTimeline[0]).toEqual({ "discoveryYear": 2012, "small": 2 });
                done();
            });
        });
        it("should properly aggregate by year and by different sizes", (done) => {
            exoplanet.getDiscoveryTimeline().then((discoveryTimeline) => {
                expect(discoveryTimeline[1]).toEqual({ "discoveryYear": 2015, "small": 2, "medium": 2, "large": 1 });
                done();
            });
        });
        it("should have results be sorted by year", (done) => {
            exoplanet.getDiscoveryTimeline().then((discoveryTimeline) => {
                expect(discoveryTimeline).toEqual(discoveryTimeline.sort((a, b) => { return a['discoveryYear'] > b['discoveryYear'] ? 1 : -1; }));
                done();
            });
        });
    });

    describe("when the there is an error accesing the external API", () => {
        let exoplanet;
        beforeEach(() => {
            //Mock ExoplanetService to prevent external http call
            class ExoplanetService {
                getPlanets() {
                    return new Promise((resolve, reject) => {
                        reject();
                    });
                }
            };
            const Exoplanet = proxyquire('../../exoplanet/controller', {
                './service': ExoplanetService
            });
            exoplanet = new Exoplanet();
        });

        it("should respond with an error", (done) => {
            exoplanet.getDiscoveryTimeline().catch(() => {
                done();
            });
        });
    });
});
