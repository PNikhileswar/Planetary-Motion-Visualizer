@echo off
echo 🚀 Starting 3D Solar System Visualizer...
echo.
echo Choose your preferred method:
echo 1. Python HTTP Server (if Python is installed)
echo 2. Open directly in browser
echo 3. Instructions for other methods
echo.

set /p choice="Enter your choice (1/2/3): "

if "%choice%"=="1" (
    echo.
    echo Starting Python HTTP Server on port 8000...
    echo Open http://localhost:8000 in your browser
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo.
    echo Opening index.html directly in your default browser...
    start index.html
) else if "%choice%"=="3" (
    echo.
    echo ========================================
    echo Alternative Methods to Run the Project:
    echo ========================================
    echo.
    echo 1. Python 3 HTTP Server:
    echo    python -m http.server 8000
    echo.
    echo 2. Node.js HTTP Server:
    echo    npx http-server
    echo.
    echo 3. PHP Built-in Server:
    echo    php -S localhost:8000
    echo.
    echo 4. VS Code Live Server:
    echo    Install Live Server extension
    echo    Right-click index.html ^> "Open with Live Server"
    echo.
    echo 5. Direct File Access:
    echo    Simply double-click index.html
    echo    (May have CORS restrictions with some browsers)
    echo.
    echo 6. Online Hosting:
    echo    Upload to GitHub Pages, Netlify, or Vercel
    echo.
    echo ========================================
    echo.
    pause
) else (
    echo Invalid choice. Please run the script again.
    pause
)
