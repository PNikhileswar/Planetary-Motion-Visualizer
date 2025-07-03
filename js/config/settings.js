/**
 * Application settings and configuration
 */

const APP_CONFIG = {
    // Animation settings
    animation: {
        defaultGlobalSpeed: 1.0,
        maxGlobalSpeed: 5.0,
        minGlobalSpeed: 0.0,
        maxIndividualSpeed: 3.0,
        minIndividualSpeed: 0.0
    },
    
    // Camera settings
    camera: {
        defaultDistance: 100,
        minDistance: 50,
        maxDistance: 200,
        defaultPosition: { x: 80, y: 50, z: 80 },
        lookAt: { x: 0, y: 0, z: 0 }
    },
    
    // Scene settings
    scene: {
        backgroundColor: 0x000000,
        fogColor: 0x000000,
        fogNear: 100,
        fogFar: 300,
        ambientLightIntensity: 0.3,
        pointLightIntensity: 1.5
    },
    
    // Visual settings
    visual: {
        starCount: 2000,
        orbitRingOpacity: 0.1
    }
};
