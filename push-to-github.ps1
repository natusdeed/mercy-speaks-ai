# PowerShell script to push Mercy Speaks Digital to GitHub
# Run this AFTER creating the repository on GitHub.com

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "🚀 Pushing Mercy Speaks Digital to GitHub..." -ForegroundColor Cyan
Write-Host ""

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -eq 'y') {
        git remote remove origin
    } else {
        Write-Host "❌ Aborting. Please remove the existing remote manually." -ForegroundColor Red
        exit 1
    }
}

# Add remote
$remoteUrl = "https://github.com/$GitHubUsername/mercy-speaks-digital.git"
Write-Host "📡 Adding remote: $remoteUrl" -ForegroundColor Green
git remote add origin $remoteUrl

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: https://github.com/$GitHubUsername/mercy-speaks-digital" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to vercel.com and import this repository" -ForegroundColor White
    Write-Host "2. Set Root Directory to: ./my-app" -ForegroundColor White
    Write-Host "3. Add environment variable: NEXT_PUBLIC_ANTHROPIC_API_KEY" -ForegroundColor White
    Write-Host "4. Deploy!" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Please check:" -ForegroundColor Red
    Write-Host "   - Your GitHub username is correct" -ForegroundColor White
    Write-Host "   - The repository 'mercy-speaks-digital' exists on GitHub" -ForegroundColor White
    Write-Host "   - You have authentication set up (GitHub CLI or credentials)" -ForegroundColor White
}
