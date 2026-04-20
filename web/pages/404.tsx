import Link from 'next/link';
import Layout from '../components/Layout';
import { getChapters } from '../lib/markdown';
import styles from './404.module.css';

export default function NotFound({ chapters }: any) {
  return (
    <Layout chapters={chapters}>
      <div className={styles.notFound}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const chapters = getChapters();
  return {
    props: { chapters },
  };
}
