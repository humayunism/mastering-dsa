import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

const CHAPTERS_DIR = path.join(process.cwd(), '..'); // Goes to mastering-dsa root

export interface Chapter {
  slug: string;
  title: string;
  path: string;
  number: string;
}

export interface ChapterContent {
  content: string;
  frontmatter: Record<string, any>;
}

// Get all chapters
export function getChapters(): Chapter[] {
  const dirs = fs.readdirSync(CHAPTERS_DIR, { withFileTypes: true });
  
  const chapters = dirs
    .filter((dir) => dir.isDirectory() && /^\d{2}-/.test(dir.name))
    .map((dir) => {
      const number = dir.name.split('-')[0];
      const name = dir.name.split('-').slice(1).join(' ');
      const title = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      
      return {
        slug: dir.name,
        title,
        path: `/${dir.name}`,
        number,
      };
    })
    .sort((a, b) => a.number.localeCompare(b.number));

  return chapters;
}

// Get chapter content
export async function getChapterContent(slug: string): Promise<ChapterContent | null> {
  const filePath = path.join(CHAPTERS_DIR, slug, 'README.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    content: processedContent.toString(),
    frontmatter,
  };
}

// Extract headings from markdown
export function extractHeadings(markdown: string): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const lines = markdown.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      headings.push({ level, text, id });
    }
  });

  return headings;
}

// Get problems/subchapters for a chapter
export function getChapterProblems(slug: string): Chapter[] {
  const chapterPath = path.join(CHAPTERS_DIR, slug);
  
  if (!fs.existsSync(chapterPath)) {
    return [];
  }

  const items = fs.readdirSync(chapterPath, { withFileTypes: true });
  
  const problems = items
    .filter((item) => item.isDirectory() && fs.existsSync(path.join(chapterPath, item.name, 'README.md')))
    .map((item) => ({
      slug: item.name,
      title: item.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      path: `/${slug}/${item.name}`,
      number: '',
    }));

  return problems;
}

// Get problem content
export async function getProblemContent(slug: string, problemSlug: string): Promise<ChapterContent | null> {
  const filePath = path.join(CHAPTERS_DIR, slug, problemSlug, 'README.md');
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    content: processedContent.toString(),
    frontmatter,
  };
}
