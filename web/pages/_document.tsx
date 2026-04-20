import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Global Site Tag (gtag.js) - Google Analytics - optional */}
        <meta name="google-site-verification" content="" />

        {/* Meta tags for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* Favicons and icons */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>📚</text></svg>" />
        <meta name="theme-color" content="#0066cc" />
        <meta name="msapplication-TileColor" content="#0066cc" />

        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
