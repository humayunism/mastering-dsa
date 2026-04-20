# 🚀 Quick Start - Next.js Book

Your complete Next.js book experience is ready! Here's how to get started:

## 1️⃣ Install Dependencies

```bash
cd web
npm install
```

## 2️⃣ Run Locally

```bash
npm run dev
```

Then open: **http://localhost:3000** in your browser 🌐

## 3️⃣ Deploy to Vercel (Recommended - Free!)

### Option A: One-Click Deploy
1. Go to https://vercel.com/import
2. Connect your GitHub repository
3. Choose `web` as the root directory
4. Click Deploy ✨

### Option B: CLI Deploy
```bash
npm install -g vercel
cd web
vercel
```

## 📁 Project Structure

```
mastering-dsa/
├── 00-prerequisites/     ← Your chapters
├── 09-intervals/
│   └── meeting-rooms-I/
├── web/                  ← NEW! Next.js app
│   ├── pages/
│   ├── components/
│   ├── lib/
│   └── styles/
└── package.json
```

## ✨ What's Included

✅ **Automatic Content Loading** - Reads all your markdown files
✅ **Beautiful UI** - Modern design with dark mode
✅ **Mobile Responsive** - Perfect on all devices
✅ **Code Syntax Highlighting** - All languages supported
✅ **Search Navigation** - Find chapters instantly
✅ **SEO Optimized** - Google-friendly
✅ **Lightning Fast** - Static generation
✅ **Deployment Ready** - Works on Vercel, Netlify, GitHub Pages

## 🎨 Customization

Edit `web/styles/globals.css` to change:
- Colors & theme
- Fonts & typography
- Spacing & layout

## 📝 Adding New Content

Your new content is **automatically added**!

Just create folders like:
```
new-chapter/
└── README.md

new-chapter/
└── problem-name/
    └── README.md
```

And rebuild. No code changes needed! 🎉

## 🔧 Development

```bash
cd web

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Web App README](./web/README.md)

## ❓ Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Clear cache:**
```bash
rm -rf web/.next
npm run dev
```

**Node version issue?**
```bash
node --version  # Should be 16+
```

---

**You're all set! 🎉**

Your beautiful DSA book is ready to shine. Deploy it, share it, and watch the magic happen! ✨
