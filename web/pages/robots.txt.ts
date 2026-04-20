import { generateRobotsTxt } from '../lib/seo';

export async function getServerSideProps({ res }: any) {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  return null;
}
