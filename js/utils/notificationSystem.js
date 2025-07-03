/**
 * Notification System - Shows user notifications
 */

class NotificationSystem {
    constructor() {
        this.notification = null;
        this.createNotificationElement();
    }

    /**
     * Create notification element
     */
    createNotificationElement() {
        this.notification = document.createElement('div');
        this.notification.id = 'notification';
        this.notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        document.body.appendChild(this.notification);
    }

    /**
     * Show notification message
     */
    show(message, duration = 3000) {
        if (!this.notification) return;

        this.notification.textContent = message;
        this.notification.style.opacity = '1';

        setTimeout(() => {
            this.notification.style.opacity = '0';
        }, duration);
    }

    /**
     * Update theme styling
     */
    updateTheme(isLightTheme) {
        if (!this.notification) return;

        if (isLightTheme) {
            this.notification.style.background = 'rgba(255, 255, 255, 0.95)';
            this.notification.style.color = '#333';
            this.notification.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            this.notification.style.background = 'rgba(0, 0, 0, 0.8)';
            this.notification.style.color = 'white';
            this.notification.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        }
    }
}
