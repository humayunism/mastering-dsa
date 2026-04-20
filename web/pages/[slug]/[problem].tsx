import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getChapters, getProblemContent, getChapterProblems } from '../../lib/markdown';
import styles from '../problem.module.css';

interface ProblemPageProps {
  chapter: {
    slug: string;
    title: string;
    number: string;
  };
  problem: {
    slug: string;
    title: string;
  };
  content: string;
  chapters: any[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mastering-dsa.vercel.app';

export default function ProblemPage({
  chapter,
  problem,
  content,
  chapters,
}: ProblemPageProps) {
  const title = `${problem.title} - ${chapter.title} - Mastering DSA`;
  const description = `${problem.title} problem in ${chapter.title} chapter. Learn with multiple approaches and solutions.`;
  const url = `${SITE_URL}/${chapter.slug}/${problem.slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={url} />

        {/* Schema.org - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              description: description,
              url: url,
              creator: {
                '@type': 'Person',
                name: 'Humayun Kabir',
              },
            }),
          }}
        />
      </Head>
      <Layout chapters={chapters} currentChapter={chapter.slug}>
        <article className={styles.problem}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/${chapter.slug}`}>{chapter.title}</Link>
            <span>/</span>
            <span>{problem.title}</span>
          </nav>

          <div className={styles.problemHeader}>
            <h1>{problem.title}</h1>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className={styles.footer}>
            <p>
              💡 Found this helpful? Share it with others or{' '}
              <a href="https://github.com/humayunism/mastering-dsa" target="_blank" rel="noopener noreferrer">
                contribute on GitHub
              </a>
            </p>
          </div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const chapters = getChapters();
  const paths: any[] = [];

  chapters.forEach((chapter) => {
    const problems = getChapterProblems(chapter.slug);
    problems.forEach((problem) => {
      paths.push({
        params: {
          slug: chapter.slug,
          problem: problem.slug,
        },
      });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const chapters = getChapters();
  const chapter = chapters.find((ch) => ch.slug === params.slug);

  if (!chapter) {
    return { notFound: true };
  }

  const problems = getChapterProblems(params.slug);
  const problem = problems.find((p) => p.slug === params.problem);

  if (!problem) {
    return { notFound: true };
  }

  const problemContent = await getProblemContent(params.slug, params.problem);
  if (!problemContent) {
    return { notFound: true };
  }

  return {
    props: {
      chapter,
      problem,
      content: problemContent.content,
      chapters,
    },
    revalidate: 3600,
  };
}
