#!/bin/bash

# Build script for Badbygg VVS Calculator Widget

echo "Building Badbygg VVS Calculator Widget..."

# Install dependencies
npm install

# Build for production
npm run build

echo "Build complete! Files are in the 'dist' folder."
echo "You can now deploy the contents of 'dist' to your web server." 