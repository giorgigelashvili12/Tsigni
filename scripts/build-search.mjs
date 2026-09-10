import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const outputFilePath = path.resolve(process.cwd(), 'public/search-index.json');
const GITHUB_API_URL = 'https://api.github.com/repos/Gios1Workspace/tsignidb/articles';

async function buildSearchIndex() {
  try {
    const res = await fetch(GITHUB_API_URL);
    if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);

    const files = await res.json();
    const mdFiles = files.filter((file) => file.name.endsWith('.md'));

    const searchIndex = await Promise.all(
      mdFiles.map(async (file) => {
        const contentRes = await fetch(file.download_url);
        const fileContent = await contentRes.text();
        const { data, content } = matter(fileContent);

        return {
          slug: file.name.replace(/\.md$/, ''),
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
      })
    );

    fs.writeFileSync(outputFilePath, JSON.stringify(searchIndex, null, 2));
    console.log(`Successfully generated search-index.json with ${searchIndex.length} articles.`);
  } catch (error) {
    console.error('Failed to build search index:', error);
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
  }
}

buildSearchIndex();
