import { Metadata } from "next"
import { redirect } from "next/navigation"

type TProps = {
    params: {
        slug?: string[]
    }
}

export async function generateMetadata({params}: TProps): Promise<Metadata> {
    return {
        title: !params.slug ? `Szukaj filmu lub serialu` : `Szukaj: ${params.slug}`
    }
}

export default function SearchPage({params}: TProps) {

    if(params.slug !== undefined && params.slug.length > 1) {
        redirect('/');
    }

    return (
        <article>
            <section>
                Params: {params.slug && params.slug.toString()}
            </section>
        </article>
    )
}
