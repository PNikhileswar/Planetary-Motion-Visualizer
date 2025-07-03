/**
 * Keyboard Shortcuts Handler
 */

class KeyboardHandler {
    constructor() {
        this.callbacks = {};
        this.setupEventListeners();
    }

    /**
     * Setup keyboard event listeners
     */
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboard(event) {
        const shortcutKeys = ['Space', 'KeyR', 'KeyT', 'KeyC', 'KeyP'];
        if (shortcutKeys.includes(event.code)) {
            event.preventDefault();
        }

        switch (event.code) {
            case 'Space':
                if (this.callbacks.onTogglePause) {
                    this.callbacks.onTogglePause();
                }
                break;
            case 'KeyR':
                if (event.ctrlKey || event.metaKey) {
                    if (this.callbacks.onResetSpeeds) {
                        this.callbacks.onResetSpeeds();
                    }
                }
                break;
            case 'KeyT':
                if (this.callbacks.onToggleTheme) {
                    this.callbacks.onToggleTheme();
                }
                break;
            case 'KeyC':
                if (this.callbacks.onResetCamera) {
                    this.callbacks.onResetCamera();
                }
                break;
            case 'KeyP':
                if (this.callbacks.onTogglePanel) {
                    this.callbacks.onTogglePanel();
                }
                break;
            case 'Escape':
                if (this.callbacks.onEscape) {
                    this.callbacks.onEscape();
                }
                break;
        }
    }

    /**
     * Set callback functions
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...callbacks };
    }

    /**
     * Get available shortcuts
     */
    getShortcuts() {
        return [
            'Space - Pause/Resume animation',
            'T - Toggle theme',
            'C - Reset camera',
            'P - Toggle control panel',
            'Ctrl+R - Reset all speeds',
            'Esc - Hide tooltips'
        ];
    }
}
