import { ReactNode } from "react"

type TProps = {
    children: ReactNode
}

export const metadata = {
    title: 'Blog'
}

export default function BlogLayout({children}: TProps) {
    return (
        <>
            {children}
        </>
    )
}
