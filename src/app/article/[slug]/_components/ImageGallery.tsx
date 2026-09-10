import React from 'react';

interface ImageGalleryProps {
	images: { src: string; alt?: string; caption?: string }[];
	columns?: 2 | 3;
}

export default function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
	if (!images || images.length === 0) {
		return null; 
	}

	const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

	return (
		<div className={`grid grid-cols-1 ${gridCols} gap-4 my-8 not-prose`}>
			{images.map((img, idx) => (
				<div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-2 overflow-hidden shadow-lg">
					<img 
						src={img.src} 
						alt={img.alt || `Gallery Image ${idx + 1}`} 
						className="w-full h-48 object-cover rounded-lg"
					/>
					{img.caption && (
						<p className="text-[11px] text-center text-zinc-400 mt-2 font-mono">
							{img.caption}
						</p>
					)}
				</div>
			))}
		</div>
	);
}
