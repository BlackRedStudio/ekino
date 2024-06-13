import MediaGrid from "@/components/media-grid/media-grid"
import Heading from "@/components/ui/heading"
import Section from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"
import TMDBService from "@/server/services/tmdb-service"
import TMDB from "@/types/tmdb-types"
import { TMediaTypes } from "@/types/types"
import { Metadata } from "next"
import { redirect } from "next/navigation"

type TProps = {
    params: {
        slug?: string[]
    },
    searchParams?: {
        type?: TMediaTypes
    }
}

export async function generateMetadata({params}: TProps): Promise<Metadata> {
    return {
        title: !params.slug ? `Szukaj filmu lub serialu` : `Szukaj: ${params.slug}`
    }
}

export default async function SearchPage({params, searchParams}: TProps) {

    if(params.slug !== undefined && params.slug.length > 1) {
        redirect('/');
    }

    const type = searchParams?.type || 'movie';
    const slug = params.slug ? params.slug[0] : undefined;

    if(!slug) return <Heading className="text-white">Brak Wyników</Heading>
    
    const mediaListRes = type === 'movie' ? await TMDBService.searchMovie(slug) : await TMDBService.searchTV(slug);
    const mediaList = mediaListRes?.results;
    let mediaGrid = null;

    if(mediaList && type === 'movie') {
        mediaGrid = <MediaGrid mediaList={mediaList as TMDB.TMovie[]} mediaType="movie" />
    } else if(mediaList && type === 'tv') {
        mediaGrid = <MediaGrid mediaList={mediaList as TMDB.TTV[]} mediaType="tv" />
    }

    let mediaHeading = null;

    if(mediaList && type === 'movie') {
        mediaHeading = <Heading tag="h2" variant="h3">
            Filmy ({mediaListRes.total_results})
        </Heading>
    } else if(mediaList && type === 'tv') {
        mediaHeading = <Heading tag="h2" variant="h3">
            Seriale ({mediaListRes.total_results})
        </Heading>
    } else {
        mediaHeading = <Heading tag="h2" variant="h3">
            Brak wyników
        </Heading>
    }


    return (
        <article>
            <Section>
                {mediaHeading}
                <Separator className="mb-7" />
                {mediaGrid}
            </Section>
        </article>
    )
}
