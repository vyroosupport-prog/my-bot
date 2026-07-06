@echo off
color 0A
setlocal

echo ================================
echo   🤖 WHATSAPP BUSINESS BOT
echo ================================
echo.
echo Starting WhatsApp bot...
echo.

call npm start

if errorlevel 1 (
    echo.
    echo Bot failed to start. Check the terminal output above.
) else (
    echo.
    echo Bot started successfully.
)

pause