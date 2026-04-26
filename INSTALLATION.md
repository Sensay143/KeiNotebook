# 🚀 Installation Guide

## Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

## Step-by-Step Setup

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies
```bash
pnpm install
```
**OR**
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
pnpm dev
```
**OR**
```bash
npm run dev
```

### 4️⃣ Open Browser
Navigate to: **http://localhost:5173**

---

## 🐛 Troubleshooting

### Issue: Blank White Screen

**Solution 1: Clear cache and reinstall**
```bash
# Remove old dependencies
rm -rf node_modules
rm -rf pnpm-lock.yaml  # or package-lock.json for npm

# Reinstall
pnpm install  # or npm install
pnpm dev      # or npm run dev
```

**Solution 2: Check browser console**
- Open browser DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

**Solution 3: Verify Node version**
```bash
node --version  # Should be 18+
```

### Issue: Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
pnpm dev --port 3000
```

### Issue: Missing Dependencies

```bash
# Install peer dependencies
pnpm add react@18.3.1 react-dom@18.3.1
```

---

## 📱 Expected Behavior

After running `pnpm dev`, you should see:
- **Mobile view**: If browser width < 1024px
- **Desktop view**: Pink sidebar layout if browser width ≥ 1024px
- Guest mode is default (Sign In button in top right)

---

## 🆘 Still Not Working?

1. Check if all files were committed to Git
2. Ensure `src/main.tsx` and `index.html` exist
3. Verify `package.json` has "dev" script
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
5. Try incognito/private browser window

---

## 📂 Required Files

Make sure these files exist:
- ✅ `index.html` (root)
- ✅ `src/main.tsx`
- ✅ `src/app/App.tsx`
- ✅ `src/styles/index.css`
- ✅ `vite.config.ts`
- ✅ `package.json`
