#!/bin/bash

echo "🚀 Starting 3D Solar System Visualizer..."
echo ""
echo "Choose your preferred method:"
echo "1. Python HTTP Server (if Python is installed)"
echo "2. Open directly in browser"
echo "3. Instructions for other methods"
echo ""

read -p "Enter your choice (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "Starting Python HTTP Server on port 8000..."
        echo "Open http://localhost:8000 in your browser"
        echo "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server 8000 || python -m http.server 8000
        ;;
    2)
        echo ""
        echo "Opening index.html directly in your default browser..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open index.html
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open index.html
        else
            echo "Please manually open index.html in your browser"
        fi
        ;;
    3)
        echo ""
        echo "========================================"
        echo "Alternative Methods to Run the Project:"
        echo "========================================"
        echo ""
        echo "1. Python 3 HTTP Server:"
        echo "   python3 -m http.server 8000"
        echo ""
        echo "2. Node.js HTTP Server:"
        echo "   npx http-server"
        echo ""
        echo "3. PHP Built-in Server:"
        echo "   php -S localhost:8000"
        echo ""
        echo "4. VS Code Live Server:"
        echo "   Install Live Server extension"
        echo "   Right-click index.html > 'Open with Live Server'"
        echo ""
        echo "5. Direct File Access:"
        echo "   Simply double-click index.html"
        echo "   (May have CORS restrictions with some browsers)"
        echo ""
        echo "6. Online Hosting:"
        echo "   Upload to GitHub Pages, Netlify, or Vercel"
        echo ""
        echo "========================================"
        echo ""
        read -p "Press Enter to continue..."
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        ;;
esac
