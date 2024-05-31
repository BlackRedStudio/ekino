'use client'

import Link from 'next/link';

import { navConfig } from '@/config/nav-config';

import { Icons } from '../icons/icons';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";

export default function Menu() {

    const [open, setOpen] = useState(false);

	const router = useRouter();

	const menuItems = navConfig.map(({ icon, label, slug }) => {
		const Icon = Icons[icon];

		return (
			<Link
				key={label}
				href={slug}
				className="flex gap-2 hover:text-primary [&:hover>svg]:fill-primary">
				<Icon /> {label}
			</Link>
		);
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button variant="outline" size="icon" className="xl:hidden" onClick={() => setOpen(true)}>
				<Icons.menu />
			</Button>
			<Select onValueChange={selectedVal => router.push(selectedVal)}>
				<SelectTrigger className="fixed bottom-5 z-50 w-[500px]">
					<SelectValue placeholder="Wybierz link" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="/">Strona główna</SelectItem>
					<SelectItem value="/blog/pierwszy-wpis">Pierwszy wpis</SelectItem>
					<SelectItem value="/szukaj">Szukaj</SelectItem>
					<SelectItem value="/moje-konto">Moje konto</SelectItem>
					<SelectItem value="/logowanie">Logowanie</SelectItem>
					<SelectItem value="/rejestracja">Rejestracja</SelectItem>
				</SelectContent>
			</Select>
			<div className="fixed bottom-32 z-50 w-[500px] space-x-5 bg-white p-5">
				<Button onClick={() => router.refresh()}>Odśwież</Button>
				<Button onClick={() => router.forward()}>Do przodu</Button>
				<Button onClick={() => router.back()}>Do tyłu</Button>
				<Button onClick={() => router.replace('/')}>Zastąp</Button>
			</div>
			<nav className="hidden gap-5 text-white xl:flex">{menuItems}</nav>
			<DialogContent className="rounded-lg bg-foreground [&>button>svg]:stroke-white">
				<DialogHeader className="text-xl font-medium tracking-wide text-white sm:text-center">
					Menu główne
				</DialogHeader>
				<div className="mx-auto max-w-[400px]">
					<nav className="space-y-5 text-center text-white [&_a]:text-xl" onClick={() => setOpen(false)}>
						{menuItems}
					</nav>
				</div>
			</DialogContent>
		</Dialog>
	);
}
