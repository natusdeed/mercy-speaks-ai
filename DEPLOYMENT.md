# Deployment Guide - Mercy Speaks Digital

## ✅ PART 1 COMPLETE: Git Repository Initialized

Your local git repository has been initialized and all files have been committed.

## 📋 PART 2: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `mercy-speaks-digital`
4. Description: "Mercy Speaks Digital - AI Automation Agency Website"
5. **DO NOT** check "Initialize with README" (we already have code)
6. Choose **Public** or **Private** (your choice)
7. Click **"Create repository"**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. **Replace `[YOUR-USERNAME]`** with your actual GitHub username in the command below:

```bash
git remote add origin https://github.com/[YOUR-USERNAME]/mercy-speaks-digital.git
```

### Step 3: Push to GitHub

```bash
git push -u origin main
```

You'll be prompted for your GitHub credentials. If you have 2FA enabled, use a Personal Access Token instead of your password.

---

## 🚀 PART 3: Deploy to Vercel

### Step 1: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** to connect your GitHub account

### Step 2: Import Project

1. Click **"Add New Project"** or **"Import Project"**
2. You'll see a list of your GitHub repositories
3. Find and select **"mercy-speaks-digital"**
4. Click **"Import"**

### Step 3: Configure Project Settings

**IMPORTANT:** This is a Next.js project, so use these settings:

- **Framework Preset:** Next.js (should auto-detect)
- **Root Directory:** `./my-app` ⚠️ **CRITICAL - Set this to `my-app`**
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)
- **Install Command:** `npm install` (auto-filled)

### Step 4: Add Environment Variable (CRITICAL!)

**Before clicking Deploy:**

1. Click **"Environment Variables"** section
2. Click **"Add"**
3. Name: `NEXT_PUBLIC_ANTHROPIC_API_KEY` ⚠️ **Must be exactly this name**
4. Value: [Paste your API key from `.env.local` file - it starts with `sk-ant-api03-...`]
5. Check all three: **Production**, **Preview**, and **Development**
6. Click **"Save"**

**Note:** Your `.env.local` file currently has `ANTHROPIC_API_KEY`, but the client-side component needs `NEXT_PUBLIC_ANTHROPIC_API_KEY`. Make sure to use the `NEXT_PUBLIC_` prefix in Vercel!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment to complete
3. You'll see a success message with your live URL (e.g., `mercy-speaks-digital.vercel.app`)

### Step 6: Test Your Deployment

1. Visit your live URL
2. Test the chatbot to ensure the API key works
3. Check all pages load correctly

---

## 🔒 Security Notes

✅ `.env.local` is already in `.gitignore` - your API key will NOT be pushed to GitHub
✅ You must manually add the environment variable in Vercel (as done in Step 4 above)
✅ The API key is stored securely in Vercel and only used during builds/runtime

---

## 📝 Troubleshooting

### If deployment fails:
- Check that Root Directory is set to `./my-app`
- Verify environment variable name is exactly `ANTHROPIC_API_KEY`
- Check Vercel build logs for specific errors

### If chatbot doesn't work:
- Verify environment variable is set in Vercel
- Check that it's enabled for Production environment
- Redeploy after adding the environment variable

---

## 🎉 Success!

Once deployed, your site will be live at: `https://mercy-speaks-digital.vercel.app`

Every time you push to GitHub, Vercel will automatically redeploy your site!
