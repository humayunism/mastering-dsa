import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getChapters } from '../lib/markdown';
import styles from './home.module.css';

interface HomeProps {
  chapters: any[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mastering-dsa.vercel.app';

export default function Home({ chapters }: HomeProps) {
  const title = 'Mastering DSA - Learn Data Structures & Algorithms';
  const description = 'A comprehensive, chapter-by-chapter guide to mastering DSA with interactive examples in JavaScript, TypeScript, Python, Go, and C++.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mastering DSA',
              description: description,
              url: SITE_URL,
              creator: {
                '@type': 'Person',
                name: 'Humayun Kabir',
              },
            }),
          }}
        />
      </Head>
      <Layout chapters={chapters}>
        <div className={styles.hero}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>Master Data Structures & Algorithms</h1>
            <p className={styles.subtitle}>
              Learn DSA from zero to hero with our comprehensive, chapter-by-chapter guide featuring interactive examples and solutions in 5 languages.
            </p>
          </div>

          <div className={styles.cta}>
            <Link href={`${chapters[0]?.path || '/00-prerequisites'}`} className={styles.ctaButton}>
              🚀 Start Learning Now
            </Link>
            <a 
              href="https://github.com/humayunism/mastering-dsa" 
              className={styles.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ View on GitHub
            </a>
          </div>

          <div className={styles.gridStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{chapters.length}</div>
              <div className={styles.statLabel}>Chapters</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Languages</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Problems</div>
            </div>
          </div>

          <div className={styles.chaptersSection}>
            <h2 className={styles.sectionTitle}>📚 Learning Chapters</h2>
            <div className={styles.chapterGrid}>
              {chapters.map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={chapter.path}
                  className={styles.chapterCard}
                  title={`Learn ${chapter.title}`}
                >
                  <span className={styles.chapterNumber}>{chapter.number}</span>
                  <h3>{chapter.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>💡 Learn</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const chapters = getChapters();
  return {
    props: { chapters },
    revalidate: 3600, // Revalidate every hour
  };
}
