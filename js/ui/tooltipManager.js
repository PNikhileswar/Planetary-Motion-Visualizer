/**
 * Tooltip Manager - Handles planet information tooltips
 */

class TooltipManager {
    constructor() {
        this.tooltip = null;
        this.isVisible = false;
    }

    /**
     * Initialize tooltip
     */
    init() {
        this.tooltip = document.getElementById('planet-tooltip');
    }

    /**
     * Show tooltip with planet information
     */
    show(planetObject, x, y) {
        if (!this.tooltip || !planetObject.userData) return;

        const userData = planetObject.userData;
        this.tooltip.innerHTML = `
            <strong>${userData.name}</strong><br>
            ${userData.description}
        `;
        
        this.tooltip.style.left = `${x + 10}px`;
        this.tooltip.style.top = `${y - 10}px`;
        this.tooltip.classList.add('visible');
        this.isVisible = true;
    }

    /**
     * Hide tooltip
     */
    hide() {
        if (!this.tooltip) return;
        
        this.tooltip.classList.remove('visible');
        this.isVisible = false;
    }

    /**
     * Update tooltip position
     */
    updatePosition(x, y) {
        if (!this.tooltip || !this.isVisible) return;
        
        this.tooltip.style.left = `${x + 10}px`;
        this.tooltip.style.top = `${y - 10}px`;
    }
}
