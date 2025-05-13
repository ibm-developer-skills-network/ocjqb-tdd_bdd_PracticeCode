#!/bin/bash
echo "****************************************"
echo " Setting up JavaScript BDD Environment"
echo "****************************************"

echo "Installing Node.js dependencies..."
npm install

echo "Making setup.sh executable..."
chmod +x bin/setup.sh

echo "Installing Chrome/Firefox WebDriver..."
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y sqlite3 firefox-esr

echo "Starting the Pet Shop Docker container..."
make app

echo "Checking the Docker container..."
docker ps

echo "****************************************"
echo " JavaScript BDD Environment Setup Complete"
echo "****************************************"
echo ""
