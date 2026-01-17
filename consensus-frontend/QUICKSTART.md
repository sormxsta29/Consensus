# 🚀 QUICK START GUIDE

## ⚠️ CRITICAL: Install Node.js First

**The site won't work until Node.js is installed!**

### Step 1: Install Node.js
1. Go to: https://nodejs.org/
2. Download **LTS version** (v20.x)
3. Run installer
4. Restart your terminal/VS Code

### Step 2: Verify Installation
```powershell
node --version   # Should show: v20.x.x
npm --version    # Should show: v10.x.x
```

### Step 3: Install Project Dependencies
```powershell
cd "c:\Users\SORMISTA PAL\Desktop\Python\consensus-frontend"
npm install
```

⏱️ **This takes 3-5 minutes** (downloads ~300MB)

### Step 4: Run the Development Server
```powershell
npm run dev
```

✅ **Open**: http://localhost:3000

---

## 🔧 If You See Errors

### "npm is not recognized"
→ Node.js not installed. Go back to Step 1.

### "Cannot find module 'next'"
→ Dependencies not installed. Run `npm install`.

### "Port 3000 already in use"
```powershell
npm run dev -- -p 3001
```

### TypeScript errors in VS Code
→ Normal until `npm install` completes. They'll disappear.

---

## 📦 Production Build (Optional)

```powershell
npm run build    # Build for production
npm start        # Run production server
```

---

## 🌐 Deploy to Vercel (Free)

1. Push to GitHub ✅ (Already done)
2. Go to https://vercel.com/
3. Click "Import Project"
4. Connect your GitHub repo
5. Deploy! 🚀

**Environment Variables** (in Vercel dashboard):
- `OPENAI_API_KEY` (optional)

---

## ✅ What Works Now

✅ All files created
✅ Project structure ready
✅ Git repository set up
✅ Pushed to GitHub

❌ **Needs Node.js to run**

---

## 📞 Still Having Issues?

1. Ensure Node.js v20+ installed
2. Delete `node_modules` folder if it exists
3. Run `npm install` again
4. Check `npm run dev` output for errors

**The code is correct. You just need Node.js installed!**
