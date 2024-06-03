import { Metadata } from "next";

type TProps = {
    params: {
        type: string;
        stringId: string;
    }
}

export async function generateMetadata({params}: TProps): Promise<Metadata> {
    return {
        title: `${params.type.toUpperCase()} ID: ${params.stringId}`
    }
}

export default function MoviesTVPage({params: {
    stringId, type
}}: TProps) {
    return (
        <article>
            <section>
                Typ: {type}
                <br />
                ID: {stringId}
            </section>
        </article>
    )
}
