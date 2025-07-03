/**
 * Planet Factory - Creates individual planet objects
 */

class PlanetFactory {
    /**
     * Create a planet mesh
     */
    static createPlanet(planetName, planetData) {
        const geometry = new THREE.SphereGeometry(planetData.radius, 24, 24);
        
        const material = new THREE.MeshPhongMaterial({
            color: planetData.color,
            shininess: 30
        });

        const planet = new THREE.Mesh(geometry, material);
        planet.name = planetName;
        planet.userData = { ...planetData };
        planet.castShadow = true;
        planet.receiveShadow = true;

        // Set initial position
        planet.position.x = planetData.distance;
        planet.position.y = 0;
        planet.position.z = 0;

        return planet;
    }

    /**
     * Create the sun
     */
    static createSun(sunData) {
        const geometry = new THREE.SphereGeometry(sunData.radius, 32, 32);
        
        const material = new THREE.MeshBasicMaterial({
            color: sunData.color,
            emissive: sunData.emissive,
            emissiveIntensity: 0.3
        });

        const sun = new THREE.Mesh(geometry, material);
        sun.name = 'sun';
        sun.userData = { ...sunData };
        
        return sun;
    }

    /**
     * Create orbit ring for planet
     */
    static createOrbitRing(planetName, distance) {
        const ringGeometry = new THREE.RingGeometry(
            distance - 0.1,
            distance + 0.1,
            64
        );

        const ringMaterial = new THREE.MeshBasicMaterial({
            color: ORBIT_COLORS[planetName] || 0x666666,
            transparent: true,
            opacity: APP_CONFIG.visual.orbitRingOpacity,
            side: THREE.DoubleSide
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2; // Horizontal
        ring.name = `${planetName}_orbit`;

        return ring;
    }
}
