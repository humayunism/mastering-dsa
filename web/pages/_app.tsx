import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../styles/globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mastering-dsa.vercel.app';
const SITE_NAME = 'Mastering DSA';
const SITE_DESCRIPTION = 'Master Data Structures and Algorithms with interactive examples and solutions in multiple languages.';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content="DSA, Data Structures, Algorithms, Learning, JavaScript, TypeScript, Python, Go, C++" />
        <meta name="theme-color" content="#0066cc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Open Graph for social sharing */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />

        {/* Canonical URL */}
        <link rel="canonical" href={SITE_URL} />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>📚</text></svg>" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

        {/* Preload fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" as="style" />
      </Head>

      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}
