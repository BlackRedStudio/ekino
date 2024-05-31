import { Icons } from "@/components/icons/icons";

type TNavConfig = {
    label: string;
    slug: string;
    icon: keyof typeof Icons;
    layoutSegment?: string;
}[]

export const navConfig: TNavConfig = [
    {
        label: 'Strona główna',
        slug: '/',
        icon: 'home'
    },
    {
        label: 'Filmy i seriale',
        slug: '/szukaj',
        icon: 'camera',
        layoutSegment: 'filmy-i-seriale'
    },
    {
        label: 'Blog',
        slug: '/blog',
        icon: 'bookOpen',
        layoutSegment: 'blog'
    },
]
