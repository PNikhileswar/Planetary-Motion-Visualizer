/**
 * Header Controls - Manages pause/resume and theme toggle
 */

class HeaderControls {
    constructor() {
        this.elements = {};
        this.callbacks = {};
        this.isLightTheme = false;
    }

    /**
     * Initialize header controls
     */
    init() {
        this.findElements();
        this.setupEventListeners();
    }

    /**
     * Find DOM elements
     */
    findElements() {
        this.elements = {
            pauseBtn: document.getElementById('pauseBtn'),
            themeToggle: document.getElementById('themeToggle')
        };
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Pause/Resume button
        if (this.elements.pauseBtn) {
            this.elements.pauseBtn.addEventListener('click', () => {
                if (this.callbacks.onTogglePause) {
                    const isPaused = this.callbacks.onTogglePause();
                    this.updatePauseButton(isPaused);
                }
            });
        }

        // Theme toggle button
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    /**
     * Update pause button text
     */
    updatePauseButton(isPaused) {
        if (this.elements.pauseBtn) {
            this.elements.pauseBtn.innerHTML = isPaused ? '▶️ Resume' : '⏸️ Pause';
        }
    }

    /**
     * Toggle light/dark theme
     */
    toggleTheme() {
        this.isLightTheme = !this.isLightTheme;
        document.body.classList.toggle('light-theme', this.isLightTheme);
        
        if (this.elements.themeToggle) {
            this.elements.themeToggle.innerHTML = this.isLightTheme ? '🌞 Light Mode' : '🌙 Dark Mode';
        }

        if (this.callbacks.onThemeChange) {
            this.callbacks.onThemeChange(this.isLightTheme);
        }
    }

    /**
     * Set callback functions
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...callbacks };
    }
}
