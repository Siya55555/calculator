# Netlify Deployment - Step by Step

## 🚀 **Easiest Deployment Option**

Netlify is the fastest and easiest way to deploy your widget. Here's exactly how to do it:

---

## 📋 **Step 1: Prepare Your Code**

### **Option A: If you have GitHub**
1. Push your code to GitHub
2. Make sure your repository is public or you have a paid Netlify plan

### **Option B: If you don't have GitHub**
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository
3. Upload your code to GitHub

---

## 🎯 **Step 2: Deploy to Netlify**

### **Step 2.1: Go to Netlify**
1. Visit [netlify.com](https://netlify.com)
2. Click "Sign up" or "Log in"
3. Choose "Sign up with GitHub" (recommended)

### **Step 2.2: Connect Your Repository**
1. Click "New site from Git"
2. Choose "GitHub" as your Git provider
3. Authorize Netlify to access your GitHub account
4. Select your repository

### **Step 2.3: Configure Build Settings**
Set these exact values:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: Leave as default (or set to 18)

### **Step 2.4: Deploy**
1. Click "Deploy site"
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://your-site-name.netlify.app`

---

## ✅ **Step 3: Test Your Deployment**

### **Test Checklist**
- [ ] Visit your Netlify URL
- [ ] Test the questionnaire (all 5 steps)
- [ ] Check mobile responsiveness
- [ ] Verify price calculation works
- [ ] Test contact form validation

### **If Something Doesn't Work**
1. Check the "Deploys" tab in Netlify
2. Look for build errors
3. Check the browser console for JavaScript errors
4. Verify all files are in the `dist/` folder

---

## 🔧 **Step 4: Customize Your Domain (Optional)**

### **Change the URL**
1. Go to "Site settings" in Netlify
2. Click "Change site name"
3. Choose a custom name like `badbygg-widget` or `price-calculator`

### **Custom Domain (If You Have One)**
1. Go to "Domain management"
2. Add your custom domain
3. Follow the DNS setup instructions

---

## 📱 **Step 5: Embed on Your Website**

### **Get Your Widget URL**
Your widget will be available at: `https://your-site-name.netlify.app`

### **Add to Your Website**
```html
<iframe 
  src="https://your-site-name.netlify.app/" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

---

## 🎨 **Step 6: Customize Before Deploying**

### **Update Branding**
Before deploying, edit `src/App.tsx`:
```typescript
// Change this line:
<Logo>Badbygg VVS</Logo>

// To your company name:
<Logo>Your Company Name</Logo>
```

### **Update Colors**
Change the blue color to your brand color:
```typescript
// In src/App.tsx and src/components/Questionnaire.tsx
// Change #007bff to your brand color
background: #your-brand-color;
```

### **Update Prices**
Edit `src/config/pricing.ts` with your actual prices:
```typescript
export const PRICING_CONFIG: PricingConfig = {
  basePrices: {
    totalrenovering: 2500,  // Your price
    delrenovering: 1800,     // Your price
    nybygg: 3500,           // Your price
    // ... other prices
  },
  // ... other settings
};
```

---

## 🔄 **Step 7: Update Deployments**

### **Automatic Updates**
- Every time you push to GitHub, Netlify will automatically rebuild and deploy
- No manual work needed for updates

### **Manual Updates**
1. Make your changes locally
2. Push to GitHub
3. Netlify automatically deploys the new version

---

## 📊 **Step 8: Monitor Your Widget**

### **Netlify Analytics**
- Go to "Analytics" in your Netlify dashboard
- See page views, unique visitors, etc.

### **Form Submissions**
- Check "Forms" in Netlify dashboard
- See all form submissions from your widget

---

## 🚨 **Troubleshooting**

### **Build Fails**
1. Check the build log in Netlify
2. Common issues:
   - Missing dependencies
   - TypeScript errors
   - File path issues

### **Widget Doesn't Load**
1. Check browser console for errors
2. Verify all files are in the `dist/` folder
3. Check if HTTPS is working

### **Styling Issues**
1. Verify CSS file is loading
2. Check for path issues
3. Test in different browsers

---

## 🎯 **Success!**

Once deployed, you'll have:
- ✅ Live widget at your Netlify URL
- ✅ Automatic HTTPS
- ✅ Mobile-friendly design
- ✅ Easy updates via GitHub
- ✅ Analytics and form tracking
- ✅ Ready to embed on your website

---

**Your widget is now live and ready to generate leads for your business!** 