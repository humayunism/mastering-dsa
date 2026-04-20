import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getChapters, getChapterContent, getChapterProblems } from '../../lib/markdown';
import styles from './chapter.module.css';

interface ChapterPageProps {
  chapter: {
    slug: string;
    title: string;
    number: string;
  };
  content: string;
  problems: any[];
  chapters: any[];
}

export default function ChapterPage({
  chapter,
  content,
  problems,
  chapters,
}: ChapterPageProps) {
  return (
    <>
      <Head>
        <title>{chapter.title} - Mastering DSA</title>
        <meta name="description" content={`Learn ${chapter.title} - Chapter ${chapter.number}`} />
        <meta property="og:title" content={chapter.title} />
      </Head>
      <Layout chapters={chapters} currentChapter={chapter.slug}>
        <article className={styles.chapter}>
          <div className={styles.chapterHeader}>
            <span className={styles.chapterNumber}>Chapter {chapter.number}</span>
            <h1>{chapter.title}</h1>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {problems.length > 0 && (
            <div className={styles.problems}>
              <h2>📌 Problems in this Chapter</h2>
              <div className={styles.problemsList}>
                {problems.map((problem) => (
                  <Link
                    key={problem.slug}
                    href={`/${chapter.slug}/${problem.slug}`}
                    className={styles.problemCard}
                  >
                    <h3>{problem.title}</h3>
                    <p>Explore this problem →</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.navigation}>
            <div className={styles.navItem}>
              {/* Previous chapter navigation can be added here */}
            </div>
            <div className={styles.navItem}>
              {/* Next chapter navigation can be added here */}
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const chapters = getChapters();
  return {
    paths: chapters.map((chapter) => ({
      params: { slug: chapter.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const chapters = getChapters();
  const chapter = chapters.find((ch) => ch.slug === params.slug);

  if (!chapter) {
    return { notFound: true };
  }

  const chapterContent = await getChapterContent(params.slug);
  if (!chapterContent) {
    return { notFound: true };
  }

  const problems = getChapterProblems(params.slug);

  return {
    props: {
      chapter,
      content: chapterContent.content,
      problems,
      chapters,
    },
    revalidate: 60,
  };
}
