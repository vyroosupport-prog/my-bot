@echo off
setlocal

echo Restarting WhatsApp bot...

for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo csv ^| findstr /i "node.exe"') do (
    taskkill /F /PID %%i >nul 2>&1
)

timeout /t 3 >nul

call npm start

if errorlevel 1 (
    echo.
    echo Bot restart failed. Check the terminal output above.
) else (
    echo.
    echo Bot restarted successfully.
)

pause