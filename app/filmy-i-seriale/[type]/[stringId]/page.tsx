import { Metadata } from "next";
import { redirect } from "next/navigation";

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

    if((type !== 'filmy' && type !== 'seriale')) {
        redirect('/szukaj');
    }

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
