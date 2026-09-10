"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchItem {
    slug: string;
    title: string;
    topic: string;
    region: string; 
    era: string;
    snippet: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);

    useEffect(() => {
        fetch('/search-index.json')
            .then((res) => res.json())
            .then((data: SearchItem[]) => {
                const fuseInstance = new Fuse(data, {
                    keys: ['title', 'topic', 'region', 'era', 'snippet'],
                    threshold: 0.35,
                });
                setFuse(fuseInstance);
            });
    }, []);

    useEffect(() => {
        if (!fuse || !query.trim()) {
            setResults([]);
            return;
        }
        const searchResults = fuse.search(query).map((res) => res.item);
        setResults(searchResults.slice(0, 5));
    }, [query, fuse]);

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto p-4">
            <div className="relative flex items-center w-full rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-2xl transition-all duration-300 focus-within:border-rose-500/80 focus-within:ring-4 focus-within:ring-rose-500/10 group">
                <div className="pl-4 text-zinc-400 group-focus-within:text-rose-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="მოიძიეთ რაც გაინტერესებთ..."
                    className="w-full bg-transparent py-3.5 pl-3 pr-12 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none"
                />

                {query && (
                    <div className="absolute right-3 flex items-center gap-2">
                        <button
                            onClick={handleClear}
                            type="button"
                            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                            aria-label="Clear search"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {query.trim() !== '' && (
                <div className="absolute left-4 right-4 mt-2 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 divide-y divide-zinc-800/50">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/article/${item.slug}`}
                                onClick={handleClear}
                                className="block p-3.5 hover:bg-zinc-800/60 transition-colors group"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-sm font-medium text-zinc-200 group-hover:text-rose-400 transition-colors">
                                        {item.title}
                                    </h4>
                                    <div className="flex gap-1.5 text-[10px] font-mono">
                                        {item.region && (
                                            <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700/50">
                                                {item.region}
                                            </span>
                                        )}
                                        {item.topic && (
                                            <span className="bg-rose-950/40 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/20">
                                                {item.topic}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-1">
                                    {item.snippet}...
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 text-center text-xs text-zinc-500">
                            შედეგი ვერ მოიძებნა
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
