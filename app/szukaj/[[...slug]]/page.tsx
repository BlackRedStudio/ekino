type TProps = {
    params: {
        slug?: string[]
    }
}

export default function SearchPage({params}: TProps) {
    return (
        <article>
            <section>
                Params: {params.slug && params.slug.toString()}
            </section>
        </article>
    )
}
