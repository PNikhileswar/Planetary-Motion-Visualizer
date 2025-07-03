/**
 * Main Solar System Application
 * Coordinates all components and manages the overall application flow
 */

class SolarSystemApp {
    constructor() {
        // Core components
        this.sceneManager = null;
        this.planetManager = null;
        this.animationController = null;
        this.cameraController = null;
        
        // UI components
        this.controlPanel = null;
        this.headerControls = null;
        this.tooltipManager = null;
        this.notificationSystem = null;
        
        // Utilities
        this.interactionHandler = null;
        this.keyboardHandler = null;
        this.starfield = null;
        
        // State
        this.isInitialized = false;
    }

    /**
     * Initialize the complete application
     */
    async init() {
        try {
            console.log('🚀 Initializing Solar System...');
            
            // Check Three.js availability
            this.checkDependencies();
            
            // Initialize core components
            await this.initializeCore();
            
            // Initialize UI components
            this.initializeUI();
            
            // Initialize utilities
            this.initializeUtils();
            
            // Setup interactions between components
            this.setupComponentInteractions();
            
            // Start the application
            this.start();
            
            this.isInitialized = true;
            console.log('✅ Solar System initialized successfully!');
            
            // Hide loading and show welcome
            this.hideLoading();
            this.showWelcome();
            
        } catch (error) {
            console.error('❌ Failed to initialize Solar System:', error);
            this.showError('Failed to load Solar System. Please refresh the page.');
        }
    }

    /**
     * Check for required dependencies
     */
    checkDependencies() {
        if (typeof THREE === 'undefined') {
            throw new Error('Three.js library not loaded');
        }
        
        if (typeof THREE.OrbitControls === 'undefined' && typeof OrbitControls !== 'undefined') {
            THREE.OrbitControls = OrbitControls;
        }
    }

    /**
     * Initialize core 3D components
     */
    async initializeCore() {
        // Scene setup
        this.sceneManager = new SceneManager();
        this.sceneManager.init();
        
        // Planet management
        this.planetManager = new PlanetManager();
        this.planetManager.init(this.sceneManager);
        
        // Animation system
        this.animationController = new AnimationController();
        
        // Camera controller
        this.cameraController = new CameraController(
            this.sceneManager.camera,
            this.sceneManager.controls
        );
        
        // Create starfield
        this.starfield = StarfieldGenerator.create();
        this.sceneManager.add(this.starfield);
    }

    /**
     * Initialize UI components
     */
    initializeUI() {
        // Control panel
        this.controlPanel = new ControlPanel();
        this.controlPanel.init();
        
        // Header controls
        this.headerControls = new HeaderControls();
        this.headerControls.init();
        
        // Tooltip manager
        this.tooltipManager = new TooltipManager();
        this.tooltipManager.init();
        
        // Notification system
        this.notificationSystem = new NotificationSystem();
    }

    /**
     * Initialize utility components
     */
    initializeUtils() {
        // Interaction handler
        this.interactionHandler = new InteractionHandler();
        this.interactionHandler.init(this.sceneManager.renderer);
        
        // Keyboard handler
        this.keyboardHandler = new KeyboardHandler();
    }

    /**
     * Setup interactions between components
     */
    setupComponentInteractions() {
        // Control panel callbacks
        this.controlPanel.setCallbacks({
            onGlobalSpeedChange: (speed) => {
                this.animationController.setGlobalSpeed(speed);
            },
            onPlanetSpeedChange: (planetName, speed) => {
                this.planetManager.setPlanetSpeed(planetName, speed);
            },
            onResetSpeeds: () => {
                this.animationController.setGlobalSpeed(APP_CONFIG.animation.defaultGlobalSpeed);
                this.planetManager.resetSpeeds();
                this.notificationSystem.show('All speeds reset to default');
            },
            onCameraDistanceChange: (distance) => {
                this.cameraController.setDistance(distance);
            },
            onResetCamera: () => {
                this.cameraController.reset();
                this.notificationSystem.show('Camera reset to default position');
            }
        });

        // Header controls callbacks
        this.headerControls.setCallbacks({
            onTogglePause: () => {
                const isPaused = this.animationController.togglePause();
                this.notificationSystem.show(isPaused ? 'Animation Paused' : 'Animation Resumed');
                return isPaused;
            },
            onThemeChange: (isLightTheme) => {
                this.notificationSystem.updateTheme(isLightTheme);
                this.notificationSystem.show(`Switched to ${isLightTheme ? 'Light' : 'Dark'} Theme`);
            }
        });

        // Interaction handler callbacks
        this.interactionHandler.setCallbacks({
            onMouseMove: (mouse, clientX, clientY) => {
                const intersects = this.interactionHandler.raycast(
                    this.sceneManager.camera,
                    this.planetManager.getAllPlanetMeshes()
                );

                if (intersects.length > 0) {
                    this.tooltipManager.show(intersects[0].object, clientX, clientY);
                    document.body.style.cursor = 'pointer';
                } else {
                    this.tooltipManager.hide();
                    document.body.style.cursor = 'default';
                }
            },
            onMouseClick: (mouse) => {
                const intersects = this.interactionHandler.raycast(
                    this.sceneManager.camera,
                    this.planetManager.getAllPlanetMeshes()
                );

                if (intersects.length > 0) {
                    this.cameraController.focusOnPlanet(intersects[0].object);
                    this.notificationSystem.show(`Focusing on ${intersects[0].object.userData.name}`);
                }
            }
        });

        // Keyboard handler callbacks
        this.keyboardHandler.setCallbacks({
            onTogglePause: () => {
                const isPaused = this.animationController.togglePause();
                this.headerControls.updatePauseButton(isPaused);
                this.notificationSystem.show(isPaused ? 'Animation Paused' : 'Animation Resumed');
            },
            onToggleTheme: () => {
                this.headerControls.toggleTheme();
            },
            onResetCamera: () => {
                this.cameraController.reset();
                this.controlPanel.resetCameraControl();
                this.notificationSystem.show('Camera reset');
            },
            onResetSpeeds: () => {
                this.animationController.setGlobalSpeed(APP_CONFIG.animation.defaultGlobalSpeed);
                this.planetManager.resetSpeeds();
                this.controlPanel.resetAllSpeedControls();
                this.notificationSystem.show('All speeds reset');
            },
            onTogglePanel: () => {
                this.controlPanel.togglePanel();
            },
            onEscape: () => {
                this.tooltipManager.hide();
            }
        });
    }

    /**
     * Start the application animation loop
     */
    start() {
        this.animationController.start(
            // Update callback
            (deltaTime) => {
                this.update(deltaTime);
            },
            // Render callback
            () => {
                this.render();
            }
        );
    }

    /**
     * Update all animated components
     */
    update(deltaTime) {
        // Update planetary orbits
        OrbitalCalculator.updatePlanetOrbits(
            this.planetManager,
            this.animationController,
            deltaTime
        );
        
        // Update sun rotation
        OrbitalCalculator.updateSunRotation(
            this.planetManager.sun,
            this.animationController,
            deltaTime
        );
        
        // Update starfield
        StarfieldGenerator.animate(this.starfield, deltaTime);
    }

    /**
     * Render the scene
     */
    render() {
        this.sceneManager.render();
    }

    /**
     * Hide loading screen
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }

    /**
     * Show welcome message
     */
    showWelcome() {
        setTimeout(() => {
            this.notificationSystem.show('Welcome! Hover over planets for info 🪐', 4000);
        }, 1000);
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            z-index: 9999;
            max-width: 400px;
        `;
        
        errorDiv.innerHTML = `
            <h3>⚠️ Error</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #ff4444;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 1rem;
            ">Reload Page</button>
        `;
        
        document.body.appendChild(errorDiv);
        this.hideLoading();
    }

    /**
     * Get current application state
     */
    getState() {
        return {
            isInitialized: this.isInitialized,
            isPaused: this.animationController?.isPausedState() || false,
            globalSpeed: this.animationController?.getGlobalSpeed() || 1.0,
            planetSpeeds: this.planetManager?.getSpeeds() || {}
        };
    }

    /**
     * Cleanup resources
     */
    dispose() {
        if (this.animationController) {
            this.animationController.stop();
        }
        
        console.log('🧹 Solar System cleaned up');
    }
}
