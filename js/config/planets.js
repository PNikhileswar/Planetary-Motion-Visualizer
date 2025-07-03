/**
 * Planet configuration data
 * Contains all planet properties like size, color, distance, speed
 */

const PLANETS = {
    sun: {
        name: 'Sun',
        radius: 8,
        color: 0xffd700,
        emissive: 0xffa500,
        distance: 0,
        speed: 0,
        rotationSpeed: 0.005,
        description: 'The Sun is the star at the center of our solar system.'
    },
    mercury: {
        name: 'Mercury',
        radius: 0.8,
        color: 0x8c7853,
        distance: 15,
        speed: 0.02,
        rotationSpeed: 0.01,
        description: 'Mercury is the smallest planet and closest to the Sun.'
    },
    venus: {
        name: 'Venus',
        radius: 1.2,
        color: 0xffc649,
        distance: 20,
        speed: 0.015,
        rotationSpeed: 0.008,
        description: 'Venus is the hottest planet with thick, toxic atmosphere.'
    },
    earth: {
        name: 'Earth',
        radius: 1.3,
        color: 0x6b93d6,
        distance: 25,
        speed: 0.012,
        rotationSpeed: 0.02,
        description: 'Earth is our home planet, the only known planet with life.'
    },
    mars: {
        name: 'Mars',
        radius: 1.0,
        color: 0xcd5c5c,
        distance: 30,
        speed: 0.009,
        rotationSpeed: 0.018,
        description: 'Mars is the "Red Planet" due to iron oxide on its surface.'
    },
    jupiter: {
        name: 'Jupiter',
        radius: 4.0,
        color: 0xd8ca9d,
        distance: 40,
        speed: 0.006,
        rotationSpeed: 0.04,
        description: 'Jupiter is the largest planet with a Great Red Spot storm.'
    },
    saturn: {
        name: 'Saturn',
        radius: 3.5,
        color: 0xfad5a5,
        distance: 50,
        speed: 0.004,
        rotationSpeed: 0.035,
        description: 'Saturn is famous for its beautiful ring system.'
    },
    uranus: {
        name: 'Uranus',
        radius: 2.2,
        color: 0x4fd0e3,
        distance: 60,
        speed: 0.003,
        rotationSpeed: 0.025,
        description: 'Uranus rotates on its side and has a faint ring system.'
    },
    neptune: {
        name: 'Neptune',
        radius: 2.1,
        color: 0x4b70dd,
        distance: 70,
        speed: 0.002,
        rotationSpeed: 0.022,
        description: 'Neptune is the windiest planet with speeds up to 2,100 km/h.'
    }
};
