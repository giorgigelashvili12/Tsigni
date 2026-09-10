import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.resolve(process.cwd(), '../db/articles');
const outputFilePath = path.resolve(process.cwd(), 'public/search-index.json');

function buildSearchIndex() {
  if (!fs.existsSync(contentDir)) {
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
    return;
  }

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  const searchIndex = files.map((file) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      topic: data.topic || 'General',
      region: data.region || 'Georgia',
      era: data.era || 'Historical',
      snippet: content
        .replace(/#+\s+/g, '')
        .replace(/[*_`>]/g, '')
        .replace(/\n+/g, ' ')
        .trim()
        .slice(0, 160)
    };
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(searchIndex, null, 2));
}

buildSearchIndex();
