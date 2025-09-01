# Deploy script for Evolve Svelte application
# This script builds the application and deploys it to a remote server via SFTP

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerHost,
    
    [Parameter(Mandatory=$false)]
    [string]$SshKeyPath = "$env:USERPROFILE\.ssh\id_rsa",
    
    [Parameter(Mandatory=$false)]
    [string]$RemotePath = "/var/www/html",
    
    [Parameter(Mandatory=$false)]
    [string]$Username = "root",
    
    [Parameter(Mandatory=$false)]
    [switch]$RestartNginx
)

# Function to write colored output
function Write-ColorOutput {
    param([string]$Message, [string]$Color = "Green")
    Write-Host $Message -ForegroundColor $Color
}

# Function to check if a command exists
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

Write-ColorOutput "=== Starting Evolve Deployment ===" "Cyan"

# Step 1: Build the application
Write-ColorOutput "Step 1: Building the application..." "Yellow"
try {
    if (!(Test-Path "package.json")) {
        throw "package.json not found. Make sure you're running this script from the project root."
    }
    
    Write-Host "Running npm run build..."
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }
    
    if (!(Test-Path "build")) {
        throw "Build directory not found after build completion."
    }
    
    Write-ColorOutput "✓ Build completed successfully" "Green"
} catch {
    Write-ColorOutput "✗ Build failed: $($_.Exception.Message)" "Red"
    exit 1
}

# Step 2: Check SSH key and dependencies
Write-ColorOutput "Step 2: Checking SSH configuration..." "Yellow"
try {
    if (!(Test-Path $SshKeyPath)) {
        throw "SSH private key not found at $SshKeyPath"
    }
    
    # Check if we have ssh/sftp available
    if (!(Test-Command "ssh") -or !(Test-Command "sftp")) {
        throw "SSH/SFTP commands not found. Please install OpenSSH client."
    }
    
    Write-ColorOutput "✓ SSH configuration verified" "Green"
} catch {
    Write-ColorOutput "✗ SSH check failed: $($_.Exception.Message)" "Red"
    exit 1
}

# Step 3: Test SSH connection
Write-ColorOutput "Step 3: Testing SSH connection..." "Yellow"
try {
    $testConnection = ssh -i $SshKeyPath -o ConnectTimeout=10 -o BatchMode=yes $Username@$ServerHost "echo 'Connection successful'"
    if ($LASTEXITCODE -ne 0) {
        throw "SSH connection test failed"
    }
    Write-ColorOutput "✓ SSH connection successful" "Green"
} catch {
    Write-ColorOutput "✗ SSH connection failed: $($_.Exception.Message)" "Red"
    exit 1
}

# Step 4: Create SFTP batch file for upload
Write-ColorOutput "Step 4: Preparing file upload..." "Yellow"
$sftpBatchFile = "sftp_commands.txt"
$sftpCommands = @"
cd $RemotePath
put -r build/* .
quit
"@

try {
    $sftpCommands | Out-File -FilePath $sftpBatchFile -Encoding utf8
    Write-ColorOutput "✓ SFTP batch file created" "Green"
} catch {
    Write-ColorOutput "✗ Failed to create SFTP batch file: $($_.Exception.Message)" "Red"
    exit 1
}

# Step 5: Upload files via SFTP
Write-ColorOutput "Step 5: Uploading files to remote server..." "Yellow"
try {
    Write-Host "Uploading files to $Username@$ServerHost`:$RemotePath..."
    sftp -i $SshKeyPath -b $sftpBatchFile $Username@$ServerHost
    
    if ($LASTEXITCODE -ne 0) {
        throw "SFTP upload failed with exit code $LASTEXITCODE"
    }
    
    Write-ColorOutput "✓ Files uploaded successfully" "Green"
} catch {
    Write-ColorOutput "✗ File upload failed: $($_.Exception.Message)" "Red"
    exit 1
} finally {
    # Clean up batch file
    if (Test-Path $sftpBatchFile) {
        Remove-Item $sftpBatchFile -Force
    }
}

# Step 6: Restart Nginx if requested
if ($RestartNginx) {
    Write-ColorOutput "Step 6: Restarting Nginx..." "Yellow"
    try {
        ssh -i $SshKeyPath $Username@$ServerHost "systemctl restart nginx"
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput "⚠ Nginx restart may have failed, but deployment completed" "Yellow"
        } else {
            Write-ColorOutput "✓ Nginx restarted successfully" "Green"
        }
    } catch {
        Write-ColorOutput "⚠ Nginx restart failed: $($_.Exception.Message)" "Yellow"
    }
} else {
    Write-ColorOutput "Step 6: Skipping Nginx restart (not requested)" "Gray"
}

Write-ColorOutput "=== Deployment Completed Successfully ===" "Cyan"
Write-Host ""
Write-Host "Usage examples:" -ForegroundColor "Gray"
Write-Host "  .\deploy.ps1 -ServerHost 'your-server.com'" -ForegroundColor "Gray"
Write-Host "  .\deploy.ps1 -ServerHost 'your-server.com' -RestartNginx" -ForegroundColor "Gray"
Write-Host "  .\deploy.ps1 -ServerHost 'your-server.com' -SshKeyPath 'C:\path\to\key' -Username 'user'" -ForegroundColor "Gray"