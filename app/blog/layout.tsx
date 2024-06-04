import { ReactNode } from 'react';

type TProps = {
	children: ReactNode;
};

export const metadata = {
	title: 'Blog',
};

export default function BlogLayout({ children }: TProps) {
	return (
		<article className="prose prose-invert xl:prose-xl mx-auto">
			{children}
		</article>
	);
}
