/**
 * Mouse and Touch Interaction Handler
 */

class InteractionHandler {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.callbacks = {};
    }

    /**
     * Initialize interaction handling
     */
    init(renderer) {
        this.setupEventListeners(renderer);
    }

    /**
     * Setup mouse and touch event listeners
     */
    setupEventListeners(renderer) {
        renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);

        renderer.domElement.addEventListener('click', (event) => {
            this.onMouseClick(event);
        }, false);
    }

    /**
     * Handle mouse movement
     */
    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (this.callbacks.onMouseMove) {
            this.callbacks.onMouseMove(this.mouse, event.clientX, event.clientY);
        }
    }

    /**
     * Handle mouse click
     */
    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        if (this.callbacks.onMouseClick) {
            this.callbacks.onMouseClick(this.mouse);
        }
    }

    /**
     * Perform raycasting
     */
    raycast(camera, objects) {
        this.raycaster.setFromCamera(this.mouse, camera);
        return this.raycaster.intersectObjects(objects);
    }

    /**
     * Set callback functions
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...callbacks };
    }
}
