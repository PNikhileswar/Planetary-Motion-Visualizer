# 🌟 3D Solar System Visualizer

A stunning, interactive 3D visualization of our solar system built with Three.js. This project features realistic planetary orbits, customizable speeds, and an intuitive user interface.

## 🚀 Features

### Core Features
- **3D Solar System**: All 8 planets (Mercury to Neptune) with the Sun at center
- **Real-time Speed Control**: Adjust individual planet speeds in real-time
- **Interactive Controls**: Mouse/touch controls for rotating, zooming, and panning
- **Pause/Resume**: Stop and start the entire animation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Bonus Features ✨
- **Background Starfield**: Animated stars for realistic space atmosphere
- **Planet Tooltips**: Detailed information on hover
- **Focus on Planets**: Click planets to smoothly focus camera
- **Dark/Light Themes**: Toggle between beautiful dark and light themes
- **Keyboard Shortcuts**: Quick access to common functions

## 🛠️ Installation & Setup

### Quick Start
1. **Open in browser**: Simply open `index.html` in your web browser
2. **Or use local server** (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or double-click start-server.bat (Windows) / start-server.sh (Mac/Linux)
   ```
3. **Access**: Navigate to `http://localhost:8000`

### No Build Process Required!
This project uses vanilla JavaScript and CDN-hosted libraries.

## 🌐 Live Demo & Deployed link
https://planetary-motion-visualizer.vercel.app/


## 🎮 Usage Instructions

### Controls
- **Mouse**: Left drag to rotate, scroll to zoom, right drag to pan
- **Touch**: Single touch to rotate, pinch to zoom, two-finger drag to pan
- **Hover**: Display planet information tooltips
- **Click Planet**: Focus camera on specific planet

### UI Controls
- **Speed Sliders**: Individual control for each planet's orbital speed
- **Global Speed**: Master control affecting all planetary speeds
- **Pause/Resume**: Stop or start the planetary animation
- **Theme Toggle**: Switch between dark and light themes

### Keyboard Shortcuts
- `Space`: Pause/Resume animation
- `T`: Toggle light/dark theme
- `C`: Reset camera to default position
- `R`: Reset all speeds to default

## 🏗️ Project Structure

```
Planetary-Motion-Visualizer/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles and responsive design
├── README.md               # This documentation
├── DEMO_INSTRUCTIONS.md    # Demo video guidelines
└── js/                     # Modular JavaScript architecture
    ├── config/             # Configuration (planets, settings, defaults)
    ├── core/               # Core 3D system (scene, planets, management)
    ├── animation/          # Animation logic (timing, orbital mechanics)
    ├── ui/                 # User interface (controls, tooltips, themes)
    ├── utils/              # Utilities (interaction, camera, notifications)
    ├── app.js              # Main application coordinator
    └── init.js             # Application initialization
```

## 🎯 Technical Implementation

### Architecture
- **Modular Design**: 17 focused JavaScript files for maintainability
- **Separation of Concerns**: Each module has a single responsibility
- **Professional Structure**: Config → Core → Animation → UI → Utils

### Performance
- **60fps Animation**: Optimized Three.js rendering
- **Responsive**: Efficient update loops and resource management
- **Mobile Optimized**: Touch-friendly controls and adaptive layout

### Browser Compatibility
- **Chrome** 60+ ✅
- **Firefox** 55+ ✅ 
- **Safari** 12+ ✅
- **Edge** 79+ ✅
- **Mobile browsers** supported ✅

## 🙏 Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **Vanilla JavaScript** - Core application logic
- **CSS3** - Responsive design and animations
- **HTML5** - Modern web standards

---

**Made with ❤️ for the Frontend Developer Assignment**
