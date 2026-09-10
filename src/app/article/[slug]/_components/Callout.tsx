import React from 'react';

interface CalloutProps {
	children: React.ReactNode;
	type?: 'info' | 'warning';
}

export default function Callout({ children, type = 'info' }: CalloutProps) {
	const styles = type === 'warning' 
		? 'border-amber-500/40 bg-amber-950/20 text-amber-200'
		: 'border-rose-500/40 bg-rose-950/20 text-rose-200';

	return (
		<div className={`my-6 p-4 rounded-xl border ${styles} not-prose text-sm leading-relaxed`}>
			{children}
		</div>
	);
}
