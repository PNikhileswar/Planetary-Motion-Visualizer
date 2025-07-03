/**
 * Starfield Generator - Creates animated background stars
 */

class StarfieldGenerator {
    /**
     * Create animated starfield
     */
    static create() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = APP_CONFIG.visual.starCount;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 400;     // x
            positions[i + 1] = (Math.random() - 0.5) * 400; // y
            positions[i + 2] = (Math.random() - 0.5) * 400; // z
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1,
            sizeAttenuation: true
        });

        return new THREE.Points(starGeometry, starMaterial);
    }

    /**
     * Animate starfield rotation
     */
    static animate(stars, deltaTime) {
        if (stars) {
            stars.rotation.y += 0.0001 * deltaTime;
        }
    }
}
