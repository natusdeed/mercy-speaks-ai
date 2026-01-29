# Deployment Guide - Mercy Speaks AI

## ✅ PART 1 COMPLETE: Git Repository Initialized

Your local git repository is initialized and the app is ready to deploy.

## 📋 PART 2: Push to GitHub

### Step 1: Create GitHub Repository (if needed)

1. Go to [github.com](https://github.com) and sign in
2. Click **"+"** → **"New repository"**
3. Name: `mercy-speaks-ai`
4. **DO NOT** check "Initialize with README" if you already have code
5. Create the repository

### Step 2: Connect and Push

```bash
git remote add origin https://github.com/[YOUR-USERNAME]/mercy-speaks-ai.git
git push -u origin main
```

Use a Personal Access Token if you have 2FA enabled.

---

## 🚀 PART 3: Deploy to Vercel

This project uses **Vite + React Router** (not Next.js). Deployment is configured via `vercel.json` at the repo root.

### Step 1: Sign Up / Log In

1. Go to [vercel.com](https://vercel.com)
2. **Continue with GitHub** to connect your account

### Step 2: Import Project

1. **Add New** → **Project**
2. Import **mercy-speaks-ai** from GitHub
3. Click **Import**

### Step 3: Project Settings (Vite)

**Root Directory:** Leave as **.** (repo root). Do **not** set `my-app`.

**Build settings** (usually auto-detected from `vercel.json`):

| Setting           | Value           |
|-------------------|-----------------|
| **Framework**     | Vite            |
| **Build Command** | `npm run build` |
| **Output Directory** | `my-app/dist` |
| **Install Command**  | `npm install`  |

The root `package.json` runs `cd my-app && npm run build`; output is `my-app/dist`.

### Step 4: Environment Variables (optional)

The **chatbot** calls `/api/chat`. The Next.js API route was removed; the app now runs as a static Vite SPA.

- **To use the chatbot:** Run a separate backend that implements `POST /api/chat` (e.g. Express, serverless), then add a [Vercel Rewrite](https://vercel.com/docs/project-configuration#rewrites) or proxy to that service. Or use Vercel Serverless Functions for `/api/chat`.
- **Without a backend:** The chatbot still works; it shows a fallback message (“Call us…”) when the API is unavailable.

If you add a chat API that needs `ANTHROPIC_API_KEY`:

1. **Environment Variables** → **Add**
2. Name: `ANTHROPIC_API_KEY`
3. Value: your key
4. Enable **Production**, **Preview**, **Development**
5. **Save**

### Step 5: Deploy

1. Click **Deploy**
2. Wait for the build to finish
3. Your site will be live at e.g. `https://mercy-speaks-ai.vercel.app`

### Step 6: Test

1. Open the live URL
2. Confirm all pages and navigation work
3. Test the chatbot (or verify the fallback message if no API)

---

## 🔒 Security

- `.env.local` is in `.gitignore` — secrets are not pushed to GitHub
- Add any required keys (e.g. `ANTHROPIC_API_KEY`) only in Vercel **Environment Variables**

---

## 📝 Troubleshooting

**Build fails**

- Root Directory must be **.** (repo root), not `my-app`
- Check **Build Command**: `npm run build`
- Check **Output Directory**: `my-app/dist`
- Review Vercel build logs for errors

**Chatbot always shows “Call us…”**

- The app has no built-in `/api/chat`. You need a separate backend or Vercel serverless function for the chatbot to reach an API.

---

## 🎉 Success

Once deployed, the site is live at your Vercel URL.  
**Every push to `main` triggers an automatic redeploy.**
