# Deploy Icestock Scoring to GitHub

## Prerequisites
1. Install Git: Download from https://git-scm.com/download/win
2. Create a GitHub account if you don't have one: https://github.com

## Step-by-Step Deployment

### 1. Install Git (if not installed)
- Download Git for Windows from: https://git-scm.com/download/win
- Run the installer with default settings
- Restart your terminal/PowerShell after installation

### 2. Create a GitHub Repository
1. Go to https://github.com
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `icestock-scoring` (or any name you prefer)
4. Description: "Professional icestock sport scoring system"
5. Choose **Public** (so it can be hosted on GitHub Pages)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

### 3. Push Your Code to GitHub

Open PowerShell in the project folder and run these commands:

```powershell
# Navigate to the project folder
cd C:\Users\shrey\.claude\icestock-scoring

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Icestock scoring system"

# Add your GitHub repository as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/icestock-scoring.git

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR-USERNAME` with your actual GitHub username!

### 4. Enable GitHub Pages (Free Hosting)

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/icestock-scoring`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes

Your website will be live at:
```
https://YOUR-USERNAME.github.io/icestock-scoring/
```

## Quick Commands Reference

```powershell
# Check git status
git status

# Add new changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes to GitHub
git push

# Pull latest changes
git pull
```

## Alternative: Upload Files Manually (No Git Required)

If you don't want to install Git:

1. Create a new repository on GitHub (steps above)
2. Click **"uploading an existing file"** link on the GitHub page
3. Drag and drop all files from `C:\Users\shrey\.claude\icestock-scoring\`:
   - index.html
   - styles.css
   - app.js
   - README.md
   - .gitignore
4. Click **"Commit changes"**
5. Enable GitHub Pages (step 4 above)

## Troubleshooting

### Git not recognized
- Make sure Git is installed
- Restart PowerShell after installation
- Check installation: `git --version`

### Authentication Required
GitHub may ask for credentials:
- Use Personal Access Token instead of password
- Generate token at: Settings → Developer settings → Personal access tokens → Generate new token
- Give it `repo` permissions
- Use token as password when prompted

### Push Rejected
If push fails, try:
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

## What Happens Next?

Once deployed, your website will be:
- ✅ Live on the internet
- ✅ Accessible from any device
- ✅ Free hosting forever
- ✅ Automatic HTTPS enabled
- ✅ Can share the link with anyone

## Updating Your Website

After making changes:
```powershell
cd C:\Users\shrey\.claude\icestock-scoring
git add .
git commit -m "Description of changes"
git push
```

Changes will appear on your website in 1-2 minutes!