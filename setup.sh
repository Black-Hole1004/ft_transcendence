#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function for success messages
success() {
    echo -e "${GREEN}✨ $1${NC}"
}

# Function for info messages
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function for warning messages
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function for error messages
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function for section headers
header() {
    echo -e "\n${PURPLE}🚀 $1${NC}"
    echo -e "${PURPLE}----------------------------------------${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

header "Setting up ft_transcendence development environment..."

# Check Python installation
if ! command_exists python3; then
    error "Python 3 is not installed. Please install it first."
    exit 1
fi

# Check Node.js installation
if ! command_exists node; then
    error "Node.js is not installed. Please install it first."
    exit 1
fi

# First, navigate to the app directory
cd app || {
    error "'app' directory not found"
    exit 1
}

# Backend setup
header "Setting up backend..."
cd backend || {
    error "'backend' directory not found"
    exit 1
}

# Create and activate virtual environment in backend directory
info "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt 2>/dev/null || {
    warning "No requirements.txt found. Installing core dependencies..."
    pip install django
    pip install djangorestframework
    pip install djangorestframework-simplejwt
    pip install django-cors-headers
    pip install channels
    pip install channels-redis
    pip install daphne
    pip install python-dotenv
    pip install pillow
    
    # Create requirements.txt for future use
    pip freeze > requirements.txt
    success "Created requirements.txt"
}

# Redis setup
header "Setting up Redis..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if ! command_exists brew; then
        error "Homebrew is not installed. Please install it first."
        exit 1
    fi
    brew install redis
    brew services start redis
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo apt-get update
    sudo apt-get install -y redis-server
    sudo systemctl start redis-server
fi

# Frontend setup
header "Setting up frontend dependencies..."
cd ../frontend || {
    error "'frontend' directory not found"
    exit 1
}

# Install frontend dependencies
if [ -f "package.json" ]; then
    info "Installing dependencies from package.json..."
    npm install
else
    warning "No package.json found. Installing core dependencies..."
    npm init -y
    npm install react react-dom
    npm install react-router-dom
    npm install axios
    npm install @tailwindcss/forms
    npm install tailwindcss postcss autoprefixer
    npm install react-toastify
    npm install lucide-react@0.263.1
    npm install recharts
    npm install react-confetti
    npm install lodash
    
    # Initialize Tailwind CSS if not already done
    if [ ! -f "tailwind.config.js" ]; then
        info "Initializing Tailwind CSS..."
        npx tailwindcss init -p
    fi
fi

# Return to root directory
cd ../../

header "Setup Complete! 🎉"
echo -e "${CYAN}Here's how to start development:${NC}"
echo ""
echo -e "${GREEN}1️⃣  For backend development:${NC}"
echo -e "${BLUE}   cd app/backend"
echo -e "   source venv/bin/activate"
echo -e "   python manage.py runserver${NC}"
echo ""
echo -e "${GREEN}2️⃣  For frontend development (in a new terminal):${NC}"
echo -e "${BLUE}   cd app/frontend"
echo -e "   npm start${NC}"
echo ""
echo -e "${GREEN}3️⃣  Make sure Redis is running for WebSocket support${NC}"
echo ""
echo -e "${YELLOW}🔍 To check Redis status:${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}   brew services list | grep redis${NC}"
else
    echo -e "${BLUE}   sudo systemctl status redis${NC}"
fi

success "Environment setup completed successfully! Happy coding! 🚀"
