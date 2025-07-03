/**
 * Application Initialization and Bootstrap
 * Entry point for the Solar System Visualizer
 */

// Global application instance
let solarSystemApp = null;

/**
 * Initialize the application when DOM is ready
 */
function initializeApplication() {
    try {
        console.log('🌟 Starting 3D Solar System Visualizer...');
        
        // Create and initialize the main application
        solarSystemApp = new SolarSystemApp();
        solarSystemApp.init();
        
        // Setup cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (solarSystemApp) {
                solarSystemApp.dispose();
            }
        });
        
        // Add to global scope for debugging
        window.solarSystemApp = solarSystemApp;
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
    }
}

/**
 * DOM ready check
 */
function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Check browser compatibility
 */
function checkBrowserCompatibility() {
    const issues = [];
    
    if (!window.WebGLRenderingContext) {
        issues.push('WebGL is not supported');
    }
    
    if (!window.requestAnimationFrame) {
        issues.push('requestAnimationFrame is not supported');
    }
    
    if (issues.length > 0) {
        console.warn('Browser compatibility issues:', issues.join(', '));
        return false;
    }
    
    return true;
}

// Initialize when DOM is ready
domReady(() => {
    if (checkBrowserCompatibility()) {
        // Small delay to ensure all resources are loaded
        setTimeout(initializeApplication, 100);
    } else {
        console.error('Browser not compatible with this application');
    }
});
