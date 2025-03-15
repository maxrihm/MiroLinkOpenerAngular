@echo off
echo Starting rebuild of Miro Link Opener extension...

echo Running ng build...
call ng build --configuration=production

echo Build completed!
echo.
echo Extension has been rebuilt. Please reload it in Chrome:
echo 1. Go to chrome://extensions/
echo 2. Find your extension
echo 3. Click the reload button (circular arrow)
echo.
echo Press any key to exit...
pause > nul
