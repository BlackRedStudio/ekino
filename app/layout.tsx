import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from "@/utils/lib/tailwind";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ['latin'], variable: "--font-sans", });

export const metadata: Metadata = {
	title: {
		absolute: 'E-Kino',
		template: '%s | E-Kino'
	},
	description: 'Platforma do oceny oraz zakupu filmów i seriali',
	keywords: ['Wypożyczalnia filmów', 'Wypożyczalnia seriali', 'VOD'],
	// własne metadane dodajemy w ten sposób
	// other: {
	// 	relatedMovies: ['spiderman', 'venom']
	// }
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body className={cn(
				'min-h-screen bg-foreground font-sans antialiased',
				inter.variable
			)}>
				<Header />
				<main>
				{children}
				</main>
			</body>
		</html>
	);
}
