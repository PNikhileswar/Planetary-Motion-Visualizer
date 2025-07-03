/**
 * Scene Setup - Handles Three.js scene initialization
 */

class SceneManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
    }

    /**
     * Initialize the complete scene
     */
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLighting();
        this.setupEventListeners();
    }

    /**
     * Setup the Three.js scene
     */
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(APP_CONFIG.scene.backgroundColor);
        
        // Add fog for depth perception
        this.scene.fog = new THREE.Fog(
            APP_CONFIG.scene.fogColor,
            APP_CONFIG.scene.fogNear,
            APP_CONFIG.scene.fogFar
        );
    }

    /**
     * Setup camera
     */
    setupCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        
        this.camera.position.set(
            APP_CONFIG.camera.defaultPosition.x,
            APP_CONFIG.camera.defaultPosition.y,
            APP_CONFIG.camera.defaultPosition.z
        );
        
        this.camera.lookAt(
            APP_CONFIG.camera.lookAt.x,
            APP_CONFIG.camera.lookAt.y,
            APP_CONFIG.camera.lookAt.z
        );
    }

    /**
     * Setup renderer
     */
    setupRenderer() {
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    /**
     * Setup controls
     */
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = APP_CONFIG.camera.minDistance;
        this.controls.maxDistance = APP_CONFIG.camera.maxDistance;
    }

    /**
     * Setup lighting
     */
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(
            0x404040,
            APP_CONFIG.scene.ambientLightIntensity
        );
        this.scene.add(ambientLight);

        // Sun light
        const sunLight = new THREE.PointLight(
            0xffd700,
            APP_CONFIG.scene.pointLightIntensity,
            200
        );
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        this.scene.add(sunLight);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Add object to scene
     */
    add(object) {
        this.scene.add(object);
    }

    /**
     * Render the scene
     */
    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
