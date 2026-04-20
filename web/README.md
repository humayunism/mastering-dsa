# Mastering DSA - Next.js Web App

A beautiful, SEO-optimized Next.js book experience for learning Data Structures and Algorithms.

## Features

✨ **Modern Design**
- Beautiful, responsive UI with dark mode support
- Smooth animations and transitions
- Mobile-friendly navigation

🎓 **Learning Features**
- Chapter-based structured content
- Problem-solving examples with multiple approaches
- Code syntax highlighting (all languages)
- Search functionality
- Reading progress tracking (localStorage)

⚡ **Performance**
- Static site generation (SSG)
- Fast page loads
- Optimized images and code splitting
- SEO optimized with meta tags

🚀 **Deployment**
- Deploy to Vercel with 1-click
- Works on GitHub Pages
- CDN ready

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## How It Works

The Next.js app automatically reads your markdown files from the parent `mastering-dsa` directory:

- **Chapters**: Each numbered folder (e.g., `09-intervals`) becomes a chapter
- **Problems**: Subfolders with `README.md` become problems
- **Content**: All markdown is converted to beautiful HTML with syntax highlighting

**No need to update this app when you add new chapters!** Just add new folders to the parent directory and rebuild.

## File Structure

```
web/
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── index.tsx      # Home page
│   ├── [slug].tsx     # Chapter pages
│   └── [slug]/[problem].tsx # Problem pages
├── components/        # React components
│   └── Layout.tsx     # Main layout
├── lib/               # Utilities
│   └── markdown.ts    # Markdown parsing
├── styles/            # Global styles
├── public/            # Static files
└── package.json       # Dependencies
```

## Environment Variables

No environment variables needed! The app reads from the local file system.

## Deployment

### Deploy to Vercel (Recommended)

1. Push this entire repo to GitHub
2. Connect to Vercel: https://vercel.com
3. Select the `web` directory as the root
4. Click Deploy

### Deploy to Netlify

1. Build locally: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Configure build command: `npm run build`
4. Configure output directory: `.next`

## Customization

### Change Theme Colors

Edit `styles/globals.css` to customize the color scheme:

```css
:root {
  --accent-color: #0066cc;  /* Change this */
  /* ... other colors ... */
}
```

### Add Google Analytics

Add to `pages/_app.tsx`:

```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Add your analytics code here
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

## Troubleshooting

**Problem**: Changes not showing
- Solution: Run `npm run dev` again or clear `.next` folder

**Problem**: Markdown not rendering
- Solution: Ensure README.md exists in chapter folder

**Problem**: Build fails
- Solution: Check Node.js version: `node --version` (should be 16+)

## License

Same as parent repository. See LICENSE in parent folder.

## Support

For issues or questions about the web app structure, open an issue in the main repository.

Happy learning! 📚
