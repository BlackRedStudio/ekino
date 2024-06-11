import Gallery from "@/components/gallery/gallery";
import MediaBG from "@/components/media-bg";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { TMDBImageOriginalURL } from "@/config/tmdb-config";
import TMDBService from "@/server/services/tmdb-service";
import { linkToType, typeToLabel } from "@/utils/translations";
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

    const mediaType = linkToType(type);
    const typeLabel = typeToLabel(mediaType);
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
                <MediaBG
                    src={TMDBImageOriginalURL + media.backdrop_path}
                    title={'title' in media ? media.title : media.name}
                    originalTitle={'original_title' in media ? media.original_title : media.original_name}
                    created={'release_date' in media ? media.release_date : media.first_air_date}
                    rating={media.vote_average}
                    ratingCount={media.vote_count}
                    type={mediaType}
                    actorsList={media.credits.cast.slice(0, 4)}
                    actorsListCount={media.credits.cast.length}
                />
            </section>
            <Section>
                <Heading tag="h2" variant="h3">Opis {typeLabel.toLowerCase()}u {'title' in media ? media.title : media.name}</Heading>
                <div className="text-white">
                    {media.overview}
                </div>
            </Section>
            {images?.backdrops ? <Section>
                <Gallery images={images.backdrops} />
            </Section> : ''}
        </article>
    )
}
