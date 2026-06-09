# Start Backend and Frontend servers for Chatbot-AI

Write-Host "🚀 Starting Chatbot-AI Integration..." -ForegroundColor Green
Write-Host ""

# Check if backend dependencies are installed
if (!(Test-Path ".\backend\node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

# Check if frontend dependencies are installed
if (!(Test-Path ".\frontend\node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    cd frontend
    npm install
    cd ..
}

Write-Host ""
Write-Host "✅ Dependencies ready" -ForegroundColor Green
Write-Host ""

# Create two separate PowerShell processes for backend and frontend
Write-Host "🔧 Starting Backend Server (http://localhost:3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$pwd\backend'; npm start`""

Write-Host "⏳ Waiting 3 seconds before starting frontend..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "⚛️  Starting Frontend Server (http://localhost:5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$pwd\frontend'; npm run dev`""

Write-Host ""
Write-Host "✨ Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "📝 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: Open http://localhost:5173 in your browser to use the chat!" -ForegroundColor Magenta
