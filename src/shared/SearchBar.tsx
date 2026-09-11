"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';

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
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`/search-index.json?v=${Date.now()}`)
            .then((res) => {
                if (!res.ok) throw new Error('Index error');
                return res.json();
            })
            .then((data: SearchItem[]) => {
                const fuseInstance = new Fuse(data, {
                    keys: ['title', 'topic', 'region', 'era', 'snippet'],
                    threshold: 0.4,
                    minMatchCharLength: 1
                });
                setFuse(fuseInstance);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!fuse || !query.trim()) {
            setResults([]);
            setSelectedIndex(-1);
            setIsOpen(false);
            return;
        }
        const searchResults = fuse.search(query).map((res) => res.item);
        setResults(searchResults.slice(0, 5));
        setSelectedIndex(-1);
        setIsOpen(true);
    }, [query, fuse]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setSelectedIndex(-1);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < results.length) {
                const target = results[selectedIndex];
                handleClear();
                router.push(`/article/${target.slug}`);
            } else if (results[0]) {
                const target = results[0];
                handleClear();
                router.push(`/article/${target.slug}`);
            }
        } else if (e.key === 'Escape') {
            handleClear();
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-lg mx-auto p-4">
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
                    onFocus={() => query.trim() && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
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

            {isOpen && query.trim() !== '' && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] mt-3 p-2 bg-zinc-900/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden z-50">
                    {results.length > 0 ? (
                        <div className="space-y-1">
                            {results.map((item, idx) => (
                                <Link
                                    key={item.slug}
                                    href={`/article/${item.slug}`}
                                    onClick={handleClear}
                                    className={`block p-4 rounded-xl transition-all duration-150 group ${
                                        idx === selectedIndex ? 'bg-zinc-800/90 ring-1 ring-rose-500/50' : 'hover:bg-zinc-800/60'
                                    }`}
                                >
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <h4 className={`text-base font-medium leading-snug transition-colors ${
                                                idx === selectedIndex ? 'text-rose-400' : 'text-zinc-100 group-hover:text-rose-400'
                                            }`}>
                                                {item.title}
                                            </h4>
                                            
                                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono shrink-0">
                                                {item.region && (
                                                    <span className="bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700/60">
                                                        {item.region}
                                                    </span>
                                                )}
                                                {item.topic && (
                                                    <span className="bg-rose-950/50 text-rose-300 px-2 py-0.5 rounded-md border border-rose-500/30">
                                                        {item.topic}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                                            {item.snippet}...
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center text-xs sm:text-sm text-zinc-500">
                            შედეგი ვერ მოიძებნა
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}