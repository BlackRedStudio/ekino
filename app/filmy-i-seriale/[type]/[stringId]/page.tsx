import TMDBService from "@/server/services/tmdb-service";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

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

export default async function MoviesTVPage({params: {
    stringId, type
}}: TProps) {

    if((type !== 'filmy' && type !== 'seriale')) {
        redirect('/szukaj');
    }

    const mediaType = type === 'filmy' ? 'movie' : 'tv';
    const id = parseInt(stringId);
    
    const [media, images] = await Promise.all([
        mediaType === 'movie' ? TMDBService.getMovieDetails(id) : TMDBService.getTVDetails(id),
        mediaType === 'movie' ? TMDBService.getMovieImages(id) : TMDBService.getTVImages(id),
    ]);

    if(!media) notFound();

    console.log(media);
    console.log(images);

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
