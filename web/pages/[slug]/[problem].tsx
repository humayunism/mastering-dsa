import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getChapters, getProblemContent, getChapterProblems } from '../../../lib/markdown';
import styles from './problem.module.css';

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

export default function ProblemPage({
  chapter,
  problem,
  content,
  chapters,
}: ProblemPageProps) {
  return (
    <>
      <Head>
        <title>
          {problem.title} - {chapter.title} - Mastering DSA
        </title>
        <meta
          name="description"
          content={`${problem.title} problem in ${chapter.title} chapter`}
        />
      </Head>
      <Layout chapters={chapters} currentChapter={chapter.slug}>
        <article className={styles.problem}>
          <div className={styles.breadcrumb}>
            <Link href={`/${chapter.slug}`}>{chapter.title}</Link>
            <span>/</span>
            <span>{problem.title}</span>
          </div>

          <div className={styles.problemHeader}>
            <h1>{problem.title}</h1>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className={styles.footer}>
            <p>
              💡 Found this helpful? Share it with others or contribute on{' '}
              <a href="https://github.com/humayunism/mastering-dsa">GitHub</a>
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
    revalidate: 60,
  };
}
