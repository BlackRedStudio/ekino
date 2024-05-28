type TProps = {
    params: {
        type: string;
        stringId: string;
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
