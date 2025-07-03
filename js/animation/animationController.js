/**
 * Animation Controller - Handles all animations and timing
 */

class AnimationController {
    constructor() {
        this.clock = new THREE.Clock();
        this.animationId = null;
        this.isPaused = false;
        this.globalSpeed = APP_CONFIG.animation.defaultGlobalSpeed;
    }

    /**
     * Start animation loop
     */
    start(updateCallback, renderCallback) {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            
            const deltaTime = this.clock.getDelta();
            
            // Call update callback if provided
            if (updateCallback && !this.isPaused) {
                updateCallback(deltaTime);
            }
            
            // Call render callback
            if (renderCallback) {
                renderCallback();
            }
        };

        animate();
    }

    /**
     * Stop animation
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Toggle pause/resume
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.clock.stop();
        } else {
            this.clock.start();
        }
        
        return this.isPaused;
    }

    /**
     * Set global speed
     */
    setGlobalSpeed(speed) {
        this.globalSpeed = Math.max(0, Math.min(speed, APP_CONFIG.animation.maxGlobalSpeed));
    }

    /**
     * Get current global speed
     */
    getGlobalSpeed() {
        return this.globalSpeed;
    }

    /**
     * Check if paused
     */
    isPausedState() {
        return this.isPaused;
    }
}
