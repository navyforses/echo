# ვიდეო გადატანის PowerShell სკრიპტი
param(
    [string]$SourceDir = ".\public\videos",
    [string]$DestinationDir = ".\transferred-videos"
)

# UTF-8 კოდირების დაყენება
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "🎬 ვიდეო გადატანის სისტემა" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# ვიდეო ფაილების სია
$videoFiles = @(
    "ilia-1.mp4",
    "ilia-2.mp4", 
    "ilia-3.mp4",
    "vazha-1.mp4",
    "vazha-2.mp4"
)

# დირექტორიების შემოწმება
if (-not (Test-Path $SourceDir)) {
    Write-Host "❌ ვერ მოიძებნა წყაროს დირექტორია: $SourceDir" -ForegroundColor Red
    exit 1
}

# დანიშნულების დირექტორიის შექმნა
if (-not (Test-Path $DestinationDir)) {
    New-Item -ItemType Directory -Path $DestinationDir -Force | Out-Null
    Write-Host "✅ შეიქმნა დანიშნულების დირექტორია: $DestinationDir" -ForegroundColor Green
}

# ფაილების ინფორმაციის ბეჭდვა
Write-Host "📋 ვიდეო ფაილების ინფორმაცია:" -ForegroundColor Yellow
Write-Host "=" * 50 -ForegroundColor Yellow

foreach ($file in $videoFiles) {
    $filePath = Join-Path $SourceDir $file
    if (Test-Path $filePath) {
        $fileInfo = Get-Item $filePath
        $sizeInMB = [math]::Round($fileInfo.Length / 1MB, 2)
        Write-Host "📁 $file`: $sizeInMB MB" -ForegroundColor White
    } else {
        Write-Host "❌ $file`: ფაილი არ არსებობს" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🚀 ვიდეო ფაილების გადატანა იწყება..." -ForegroundColor Green
Write-Host ""

$successful = @()
$failed = @()

foreach ($file in $videoFiles) {
    $sourcePath = Join-Path $SourceDir $file
    $destPath = Join-Path $DestinationDir $file
    
    if (Test-Path $sourcePath) {
        try {
            Write-Host "📁 გადატანა: $file" -ForegroundColor Yellow
            
            # ფაილის კოპირება პროგრესის ჩვენებით
            $fileInfo = Get-Item $sourcePath
            $totalBytes = $fileInfo.Length
            $copiedBytes = 0
            
            $reader = [System.IO.File]::OpenRead($sourcePath)
            $writer = [System.IO.File]::Create($destPath)
            
            $buffer = New-Object byte[] 8192
            $progress = 0
            
            do {
                $bytesRead = $reader.Read($buffer, 0, $buffer.Length)
                if ($bytesRead -gt 0) {
                    $writer.Write($buffer, 0, $bytesRead)
                    $copiedBytes += $bytesRead
                    $newProgress = [math]::Round(($copiedBytes / $totalBytes) * 100, 1)
                    
                    if ($newProgress -ne $progress) {
                        $progress = $newProgress
                        Write-Progress -Activity "გადატანა: $file" -Status "$progress%" -PercentComplete $progress
                    }
                }
            } while ($bytesRead -gt 0)
            
            $reader.Close()
            $writer.Close()
            
            Write-Progress -Activity "გადატანა: $file" -Completed
            Write-Host "✅ წარმატებით გადატანილი: $file" -ForegroundColor Green
            $successful += $file
            
        } catch {
            Write-Host "❌ შეცდომა $file-ის გადატანისას: $($_.Exception.Message)" -ForegroundColor Red
            $failed += $file
        }
    } else {
        Write-Host "⚠️ ფაილი არ არსებობს: $sourcePath" -ForegroundColor Yellow
        $failed += $file
    }
}

# შედეგების ბეჭდვა
Write-Host ""
Write-Host "📊 გადატანის შედეგები:" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

if ($successful.Count -gt 0) {
    Write-Host "✅ წარმატებით გადატანილი ფაილები:" -ForegroundColor Green
    foreach ($file in $successful) {
        Write-Host "   • $file" -ForegroundColor White
    }
}

if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ ვერ გადატანილი ფაილები:" -ForegroundColor Red
    foreach ($file in $failed) {
        Write-Host "   • $file" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "📁 გადატანილი ფაილები მოთავსებულია: $DestinationDir" -ForegroundColor Cyan

# დირექტორიის გახსნა
if ($successful.Count -gt 0) {
    $openFolder = Read-Host "გსურთ გადატანილი ფაილების დირექტორიის გახსნა? (y/n)"
    if ($openFolder -eq "y" -or $openFolder -eq "Y") {
        Invoke-Item $DestinationDir
    }
} 