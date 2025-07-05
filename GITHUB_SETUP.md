# GitHub Setup Guide

## 🚀 **Step-by-Step GitHub Setup**

Your project is now ready to be pushed to GitHub. Follow these steps:

---

## 📋 **Step 1: Create GitHub Repository**

### **Option A: Create Repository on GitHub.com**
1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `badbygg-widget` or `calculator-widget`
   - **Description**: `Badbygg VVS questionnaire and price calculator widget`
   - **Visibility**: Public (recommended for free Netlify)
   - **DO NOT** initialize with README (we already have one)
5. Click "Create repository"

### **Option B: Use GitHub CLI (if installed)**
```bash
gh repo create badbygg-widget --public --description "Badbygg VVS questionnaire and price calculator widget"
```

---

## 🔗 **Step 2: Connect Your Local Repository**

### **Add the Remote Repository**
Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/badbygg-widget.git
```

### **Set the Main Branch**
```bash
git branch -M main
```

### **Push to GitHub**
```bash
git push -u origin main
```

---

## ✅ **Step 3: Verify Upload**

1. Go to your GitHub repository URL
2. You should see all your files:
   - `src/` folder with your components
   - `package.json` with dependencies
   - `README.md` with documentation
   - `netlify-deploy.md` with deployment guide

---

## 🎯 **Step 4: Deploy to Netlify**

Now that your code is on GitHub, you can easily deploy to Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Choose GitHub as your Git provider
5. Select your `badbygg-widget` repository
6. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click "Deploy site"

---

## 🔄 **Step 5: Future Updates**

### **Making Changes**
1. Edit your files locally
2. Add changes: `git add .`
3. Commit changes: `git commit -m "Your update message"`
4. Push to GitHub: `git push`

### **Automatic Deployment**
- Netlify will automatically rebuild and deploy when you push to GitHub
- No manual deployment needed!

---

## 🚨 **Troubleshooting**

### **If you get authentication errors:**
1. Use GitHub CLI: `gh auth login`
2. Or create a Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token
   - Use token as password when pushing

### **If repository already exists:**
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/badbygg-widget.git
git push -u origin main
```

### **If you need to force push:**
```bash
git push -u origin main --force
```

---

## 📱 **Quick Commands Reference**

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Check remote
git remote -v

# View commit history
git log --oneline
```

---

## 🎉 **Success!**

Once you've completed these steps:
- ✅ Your code is on GitHub
- ✅ Ready for Netlify deployment
- ✅ Easy updates via git push
- ✅ Automatic deployments from GitHub

**Your widget is ready to go live!** 