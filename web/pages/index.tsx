import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getChapters } from '../lib/markdown';
import styles from './home.module.css';

interface HomeProps {
  chapters: any[];
}

export default function Home({ chapters }: HomeProps) {
  return (
    <>
      <Head>
        <title>Mastering DSA - Learn Data Structures & Algorithms</title>
      </Head>
      <Layout chapters={chapters}>
        <div className={styles.hero}>
          <h1>🎓 Mastering Data Structures & Algorithms</h1>
          <p className={styles.subtitle}>
            A comprehensive, chapter-by-chapter guide to mastering DSA with interactive examples in JavaScript, TypeScript, Python, Go, and C++.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📖</div>
              <h3>Structured Learning</h3>
              <p>Progressive chapters from foundations to advanced techniques</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💻</div>
              <h3>Multi-Language</h3>
              <p>Solutions in JS, TS, Python, Go, and C++</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Real Examples</h3>
              <p>Practical problems with multiple approaches</p>
            </div>
          </div>

          <div className={styles.cta}>
            <Link href={`${chapters[0]?.path || '/00-prerequisites'}`} className={styles.ctaButton}>
              Start Learning →
            </Link>
            <a href="https://github.com/humayunism/mastering-dsa" className={styles.ctaLink}>
              View on GitHub
            </a>
          </div>

          <div className={styles.chapters}>
            <h2>📚 Chapters</h2>
            <div className={styles.chapterGrid}>
              {chapters.map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={chapter.path}
                  className={styles.chapterCard}
                >
                  <span className={styles.chapterNumber}>{chapter.number}</span>
                  <h3>{chapter.title}</h3>
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
    revalidate: 60,
  };
}
