import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import DialectCompare from './_components/DialectCompare';
import ImageGallery from './_components/ImageGallery';
import Callout from './_components/Callout';

const mdxComponents = {
    DialectCompare,
    Callout,
    ImageGallery,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img 
            {...props} 
            className="w-full h-auto rounded-xl border border-zinc-800 object-cover my-6" 
        />
    )
};

export default async function ArticlePage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    
    const rawUrl = `https://raw.githubusercontent.com/Gios1Workspace/tsignidb/main/articles/${slug}.md`;

    const headers: HeadersInit = {
        ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        })
    };

    const res = await fetch(rawUrl, {
        headers,
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        notFound();
    }

    const fileContent = await res.text();
    const { data: frontmatter, content } = matter(fileContent);

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-xs font-mono hover:text-rose-400 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> მთავარ გვერდზე დაბრუნება
                </Link>

                <header className="space-y-4 border-b border-zinc-800 pb-6 sm:pb-8">
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                        {frontmatter.region && (
                            <span className="bg-zinc-900 border border-zinc-700/60 px-2.5 py-1 rounded-md">
                                📍 {frontmatter.region}
                            </span>
                        )}
                        {frontmatter.topic && (
                            <span className="bg-rose-950/50 border border-rose-500/30 text-rose-300 px-2.5 py-1 rounded-md">
                                {frontmatter.topic}
                            </span>
                        )}
                        {frontmatter.era && (
                            <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
                                ⏳ {frontmatter.era}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-tight sm:leading-snug">
                        {frontmatter.title}
                    </h1>
                </header>

                {frontmatter.map_url && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 overflow-hidden shadow-2xl">
                        <img
                            src={frontmatter.map_url} 
                            alt={frontmatter.title}
                            className="w-full h-auto rounded-xl object-cover"
                        />
                        <p className="text-[11px] text-center text-zinc-500 mt-2 font-mono">
                            წყარო: Dialectal Map Asset (jsDelivr CDN)
                        </p>
                    </div>
                )}

                <div className="prose prose-invert prose-rose max-w-none prose-sm sm:prose-base">
                    <MDXRemote source={content} components={mdxComponents} />
                </div>
            </article>
        </main>
    );
}