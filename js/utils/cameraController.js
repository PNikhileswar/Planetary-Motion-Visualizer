/**
 * Camera Controller - Handles camera movements and focusing
 */

class CameraController {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;
    }

    /**
     * Focus camera on a specific planet
     */
    focusOnPlanet(planetObject) {
        const targetPosition = planetObject.position.clone();
        const distance = 20;
        
        const cameraPosition = new THREE.Vector3(
            targetPosition.x + distance,
            targetPosition.y + distance * 0.5,
            targetPosition.z + distance
        );

        this.animateTo(cameraPosition, targetPosition);
    }

    /**
     * Reset camera to default position
     */
    reset() {
        const defaultPosition = new THREE.Vector3(
            APP_CONFIG.camera.defaultPosition.x,
            APP_CONFIG.camera.defaultPosition.y,
            APP_CONFIG.camera.defaultPosition.z
        );
        
        const defaultTarget = new THREE.Vector3(
            APP_CONFIG.camera.lookAt.x,
            APP_CONFIG.camera.lookAt.y,
            APP_CONFIG.camera.lookAt.z
        );

        this.animateTo(defaultPosition, defaultTarget);
    }

    /**
     * Set camera distance
     */
    setDistance(distance) {
        const clampedDistance = Math.max(
            APP_CONFIG.camera.minDistance,
            Math.min(distance, APP_CONFIG.camera.maxDistance)
        );
        
        const direction = this.camera.position.clone().normalize();
        this.camera.position.copy(direction.multiplyScalar(clampedDistance));
    }

    /**
     * Animate camera to new position
     */
    animateTo(newPosition, newTarget) {
        const startPosition = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        
        let progress = 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            // Interpolate positions
            this.camera.position.lerpVectors(startPosition, newPosition, easeProgress);
            this.controls.target.lerpVectors(startTarget, newTarget, easeProgress);
            
            this.controls.update();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }
}
