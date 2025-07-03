/**
 * Planet Manager - Handles all planet objects and their states
 */

class PlanetManager {
    constructor() {
        this.planets = {};
        this.orbitRings = {};
        this.sun = null;
        this.planetSpeeds = { ...DEFAULT_SPEEDS };
    }

    /**
     * Initialize all planets
     */
    init(scene) {
        this.createSun(scene);
        this.createPlanets(scene);
        this.createOrbitRings(scene);
    }

    /**
     * Create the sun
     */
    createSun(scene) {
        const sunData = PLANETS.sun;
        this.sun = PlanetFactory.createSun(sunData);
        scene.add(this.sun);
    }

    /**
     * Create all planets
     */
    createPlanets(scene) {
        const planetNames = Object.keys(PLANETS).filter(name => name !== 'sun');

        planetNames.forEach(planetName => {
            const planetData = PLANETS[planetName];
            const planet = PlanetFactory.createPlanet(planetName, planetData);

            // Store planet with orbital data
            this.planets[planetName] = {
                mesh: planet,
                angle: Math.random() * Math.PI * 2, // Random starting position
                distance: planetData.distance,
                speed: planetData.speed,
                rotationSpeed: planetData.rotationSpeed
            };

            scene.add(planet);
        });
    }

    /**
     * Create orbit rings
     */
    createOrbitRings(scene) {
        const planetNames = Object.keys(PLANETS).filter(name => name !== 'sun');

        planetNames.forEach(planetName => {
            const planetData = PLANETS[planetName];
            const ring = PlanetFactory.createOrbitRing(planetName, planetData.distance);
            
            this.orbitRings[planetName] = ring;
            scene.add(ring);
        });
    }

    /**
     * Get planet by name
     */
    getPlanet(planetName) {
        return this.planets[planetName];
    }

    /**
     * Get all planet meshes for raycasting
     */
    getAllPlanetMeshes() {
        const meshes = [this.sun];
        Object.values(this.planets).forEach(planet => {
            meshes.push(planet.mesh);
        });
        return meshes;
    }

    /**
     * Set planet speed
     */
    setPlanetSpeed(planetName, speed) {
        if (this.planetSpeeds.hasOwnProperty(planetName)) {
            this.planetSpeeds[planetName] = Math.max(0, Math.min(speed, APP_CONFIG.animation.maxIndividualSpeed));
        }
    }

    /**
     * Reset all speeds
     */
    resetSpeeds() {
        this.planetSpeeds = { ...DEFAULT_SPEEDS };
    }

    /**
     * Get current speeds
     */
    getSpeeds() {
        return { ...this.planetSpeeds };
    }
}
