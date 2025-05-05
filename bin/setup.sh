#!/bin/bash
echo "****************************************"
echo " Setting up JavaScript Testing Environment"
echo "****************************************"

echo "Installing Node.js and npm..."
# For Ubuntu/Debian systems
if command -v apt-get &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
# For MacOS with homebrew
elif command -v brew &> /dev/null; then
  brew install node
# For other systems, provide instructions
else
  echo "Please install Node.js manually from https://nodejs.org/"
  exit 1
fi

echo "Checking Node.js version..."
node --version
npm --version

echo "Installing dependencies..."
npm install

echo "Running tests..."
npm test

echo "****************************************"
echo " JavaScript Testing Environment Setup Complete"
echo "****************************************"
echo ""