# Quick Deployment Guide

## Prerequisites
- Git must be installed on your system
- GitHub repository must exist: `react-notes-by-react-project`

## Step-by-Step Instructions

### 1. Install Git (if needed)
Download and install Git from: https://git-scm.com/download/win

### 2. Open PowerShell in your project directory
Navigate to: `d:\Projects\Study Purpose\react-notes`

### 3. Initialize Git repository (if not already done)
```bash
git init
```

### 4. Add all files
```bash
git add .
```

### 5. Create initial commit
```bash
git commit -m "Configure GitHub Pages deployment"
```

### 6. Connect to GitHub repository
```bash
git remote add origin https://github.com/manikandan2492000/react-notes-by-react-project.git
```

### 7. Set main branch
```bash
git branch -M main
```

### 8. Push to GitHub
```bash
git push -u origin main
```

### 9. Configure GitHub Pages
1. Go to: https://github.com/manikandan2492000/react-notes-by-react-project/settings/pages
2. Under "Source", select **GitHub Actions**
3. Save the settings

### 10. Verify Deployment
1. Go to the Actions tab: https://github.com/manikandan2492000/react-notes-by-react-project/actions
2. Wait for the deployment workflow to complete (green checkmark)
3. Visit your live site: https://manikandan2492000.github.io/react-notes-by-react-project

## Alternative: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

```bash
npm install
npm run deploy
```

This will build and deploy directly to the gh-pages branch.

## Troubleshooting

**Git not found?**
- Make sure Git is installed and added to your PATH
- Restart PowerShell after installing Git

**Push rejected?**
- Make sure you have write access to the repository
- Check if the repository exists on GitHub

**Deployment failed?**
- Check the Actions tab for error messages
- Ensure GitHub Pages is configured correctly
- Verify the repository is public or you have GitHub Pages enabled for private repos
