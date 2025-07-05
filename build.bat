@echo off

echo Building Badbygg VVS Calculator Widget...

REM Install dependencies
npm install

REM Build for production
npm run build

echo Build complete! Files are in the 'dist' folder.
echo You can now deploy the contents of 'dist' to your web server.

pause 