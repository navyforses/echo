@echo off
chcp 65001 >nul
echo 🎬 ვიდეო გადატანის სისტემა
echo ==========================================
echo.

echo 📋 ვიდეო ფაილების შემოწმება...
if not exist "public\videos" (
    echo ❌ ვერ მოიძებნა public\videos დირექტორია
    pause
    exit /b 1
)

echo ✅ ვიდეო ფაილები ნაპოვნია
echo.

echo 🚀 სკრიპტის გაშვება...
node video-transfer.js

echo.
echo ✅ გადატანა დასრულდა
pause 