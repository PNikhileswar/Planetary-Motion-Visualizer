/**
 * Orbital Calculator - Handles planetary orbital mechanics
 */

class OrbitalCalculator {
    /**
     * Update planet positions based on orbital mechanics
     */
    static updatePlanetOrbits(planetManager, animationController, deltaTime) {
        if (animationController.isPausedState()) return;

        const globalSpeed = animationController.getGlobalSpeed();
        const planetSpeeds = planetManager.getSpeeds();

        Object.keys(planetManager.planets).forEach(planetName => {
            const planet = planetManager.planets[planetName];
            
            // Calculate effective speed
            const effectiveSpeed = planet.speed * 
                                 planetSpeeds[planetName] * 
                                 globalSpeed;
            
            // Update orbital angle
            planet.angle += effectiveSpeed * deltaTime;
            
            // Calculate new position using orbital mechanics
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
            
            // Update planet rotation
            planet.mesh.rotation.y += planet.rotationSpeed * deltaTime * globalSpeed;
        });
    }

    /**
     * Update sun rotation
     */
    static updateSunRotation(sun, animationController, deltaTime) {
        if (animationController.isPausedState() || !sun) return;
        
        const globalSpeed = animationController.getGlobalSpeed();
        sun.rotation.y += PLANETS.sun.rotationSpeed * deltaTime * globalSpeed;
    }

    /**
     * Calculate planet position at specific time
     */
    static getPlanetPositionAtTime(planetData, time, speed = 1.0) {
        const angle = time * planetData.speed * speed;
        return {
            x: Math.cos(angle) * planetData.distance,
            y: 0,
            z: Math.sin(angle) * planetData.distance
        };
    }
}
