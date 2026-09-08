# PowerShell startup script for GreenCycle LK
Write-Host "Building and starting GreenCycle LK containers..." -ForegroundColor Cyan
docker compose up --build -d

Write-Host "`nWaiting for GreenCycle LK backend to be ready..." -ForegroundColor Yellow

$ready = $false
$maxAttempts = 60
$attempts = 0

while (-not $ready -and $attempts -lt $maxAttempts) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        if ($res.StatusCode -eq 200) { $ready = $true }
    } catch {
        Start-Sleep -Seconds 2
        $attempts++
    }
}

if ($ready) {
    Write-Host "`n====================================================================" -ForegroundColor Green
    Write-Host "  🎉 SUCCESS! GreenCycle LK is fully up and running!" -ForegroundColor Green
    Write-Host "  🌐 Web Application: http://localhost" -ForegroundColor Cyan
    Write-Host "  📚 Swagger API UI:  http://localhost:8080/swagger-ui.html" -ForegroundColor Cyan
    Write-Host "  🤖 AI Service Docs: http://localhost:8000/docs" -ForegroundColor Cyan
    Write-Host "====================================================================`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Backend is taking longer than expected to report healthy." -ForegroundColor Yellow
    Write-Host "Check container logs with: docker compose logs -f backend" -ForegroundColor Gray
}
