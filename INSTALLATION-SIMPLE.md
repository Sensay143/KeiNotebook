# K.E.I Notebook - Installation Guide

## Quick Start (React 19)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:5173
```

---

## Clean Install (If Issues)

```bash
# Remove old files
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Start
npm run dev
```

---

## What's Included

- ✅ React 19
- ✅ React Router 7
- ✅ Tailwind CSS 4
- ✅ TypeScript
- ✅ Vite 6

---

## Troubleshooting

### White Screen?
1. Open browser console (F12)
2. Check for errors
3. Run clean install (see above)

### Port in use?
```bash
npm run dev -- --port 3000
```
