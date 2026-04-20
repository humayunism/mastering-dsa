import { generateSitemap } from '../lib/seo';

export async function getServerSideProps({ res }: any) {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
