import React from 'react';

interface CompareProps {
	regionA: string;
	textA: string;
	regionB: string;
	textB: string;
}

export default function DialectCompare({ regionA, textA, regionB, textB }: CompareProps) {
	return (
		<div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
				<span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
					📍 {regionA}
				</span>
				<p className="mt-2 text-sm text-zinc-200 leading-relaxed font-sans">{textA}</p>
			</div>

			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
				<span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
					📍 {regionB}
				</span>
				<p className="mt-2 text-sm text-zinc-200 leading-relaxed font-sans">{textB}</p>
			</div>
		</div>
	);
}
