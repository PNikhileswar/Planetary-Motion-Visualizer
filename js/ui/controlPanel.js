/**
 * Control Panel - Manages the speed control UI
 */

class ControlPanel {
    constructor() {
        this.elements = {};
        this.callbacks = {};
        this.isPanelCollapsed = false;
    }

    /**
     * Initialize control panel
     */
    init() {
        this.findElements();
        this.setupEventListeners();
        this.generatePlanetControls();
    }

    /**
     * Find DOM elements
     */
    findElements() {
        this.elements = {
            globalSpeed: document.getElementById('globalSpeed'),
            globalSpeedValue: document.getElementById('globalSpeedValue'),
            resetSpeeds: document.getElementById('resetSpeeds'),
            cameraDistance: document.getElementById('cameraDistance'),
            cameraDistanceValue: document.getElementById('cameraDistanceValue'),
            resetCamera: document.getElementById('resetCamera'),
            togglePanel: document.getElementById('togglePanel'),
            panelContent: document.getElementById('panelContent'),
            planetSpeedControls: document.getElementById('planet-speed-controls')
        };
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Global speed control
        if (this.elements.globalSpeed) {
            this.elements.globalSpeed.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                this.updateGlobalSpeedDisplay(speed);
                if (this.callbacks.onGlobalSpeedChange) {
                    this.callbacks.onGlobalSpeedChange(speed);
                }
            });
        }

        // Reset speeds button
        if (this.elements.resetSpeeds) {
            this.elements.resetSpeeds.addEventListener('click', () => {
                if (this.callbacks.onResetSpeeds) {
                    this.callbacks.onResetSpeeds();
                }
                this.resetAllSpeedControls();
            });
        }

        // Camera distance control
        if (this.elements.cameraDistance) {
            this.elements.cameraDistance.addEventListener('input', (e) => {
                const distance = parseFloat(e.target.value);
                this.updateCameraDistanceDisplay(distance);
                if (this.callbacks.onCameraDistanceChange) {
                    this.callbacks.onCameraDistanceChange(distance);
                }
            });
        }

        // Reset camera button
        if (this.elements.resetCamera) {
            this.elements.resetCamera.addEventListener('click', () => {
                if (this.callbacks.onResetCamera) {
                    this.callbacks.onResetCamera();
                }
                this.resetCameraControl();
            });
        }

        // Panel toggle
        if (this.elements.togglePanel) {
            this.elements.togglePanel.addEventListener('click', () => this.togglePanel());
        }
    }

    /**
     * Generate individual planet controls
     */
    generatePlanetControls() {
        if (!this.elements.planetSpeedControls) return;

        const planetNames = Object.keys(PLANETS).filter(name => name !== 'sun');
        
        planetNames.forEach(planetName => {
            const planetData = PLANETS[planetName];
            const controlDiv = this.createPlanetControl(planetName, planetData);
            this.elements.planetSpeedControls.appendChild(controlDiv);
        });
    }

    /**
     * Create individual planet control
     */
    createPlanetControl(planetName, planetData) {
        const controlDiv = document.createElement('div');
        controlDiv.className = 'planet-speed-control';
        controlDiv.innerHTML = `
            <div class="planet-name">${planetData.name}</div>
            <div class="control-item">
                <label for="${planetName}Speed">Speed:</label>
                <input type="range" 
                       id="${planetName}Speed" 
                       min="0" 
                       max="3" 
                       step="0.1" 
                       value="1">
                <span id="${planetName}SpeedValue">1.0x</span>
            </div>
        `;

        // Add event listener
        const speedSlider = controlDiv.querySelector(`#${planetName}Speed`);
        const speedValue = controlDiv.querySelector(`#${planetName}SpeedValue`);
        
        if (speedSlider && speedValue) {
            speedSlider.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                speedValue.textContent = `${speed.toFixed(1)}x`;
                if (this.callbacks.onPlanetSpeedChange) {
                    this.callbacks.onPlanetSpeedChange(planetName, speed);
                }
            });
        }

        return controlDiv;
    }

    /**
     * Update global speed display
     */
    updateGlobalSpeedDisplay(speed) {
        if (this.elements.globalSpeedValue) {
            this.elements.globalSpeedValue.textContent = `${speed.toFixed(1)}x`;
        }
    }

    /**
     * Update camera distance display
     */
    updateCameraDistanceDisplay(distance) {
        if (this.elements.cameraDistanceValue) {
            this.elements.cameraDistanceValue.textContent = distance.toString();
        }
    }

    /**
     * Reset all speed controls to default
     */
    resetAllSpeedControls() {
        if (this.elements.globalSpeed) {
            this.elements.globalSpeed.value = APP_CONFIG.animation.defaultGlobalSpeed;
            this.updateGlobalSpeedDisplay(APP_CONFIG.animation.defaultGlobalSpeed);
        }

        Object.keys(DEFAULT_SPEEDS).forEach(planetName => {
            const speedSlider = document.getElementById(`${planetName}Speed`);
            const speedValue = document.getElementById(`${planetName}SpeedValue`);
            
            if (speedSlider && speedValue) {
                speedSlider.value = DEFAULT_SPEEDS[planetName];
                speedValue.textContent = `${DEFAULT_SPEEDS[planetName].toFixed(1)}x`;
            }
        });
    }

    /**
     * Reset camera control
     */
    resetCameraControl() {
        if (this.elements.cameraDistance) {
            this.elements.cameraDistance.value = APP_CONFIG.camera.defaultDistance;
            this.updateCameraDistanceDisplay(APP_CONFIG.camera.defaultDistance);
        }
    }

    /**
     * Toggle panel visibility
     */
    togglePanel() {
        this.isPanelCollapsed = !this.isPanelCollapsed;
        
        if (this.elements.panelContent && this.elements.togglePanel) {
            this.elements.panelContent.classList.toggle('collapsed', this.isPanelCollapsed);
            this.elements.togglePanel.classList.toggle('collapsed', this.isPanelCollapsed);
            this.elements.togglePanel.innerHTML = this.isPanelCollapsed ? '▲' : '▼';
        }
    }

    /**
     * Set callback functions
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...callbacks };
    }
}
