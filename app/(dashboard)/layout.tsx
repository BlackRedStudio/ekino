import { ReactNode } from "react"

export const metadata = {
    title: 'Moje konto'
}

type TProps = {
    children: ReactNode
}

export default function DashboardLayout({children}: TProps) {
    return (
        <div>
            {children}
        </div>
    )
}
