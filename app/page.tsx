import TMDBService from '@/server/services/tmdb-service';

import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import MediaGrid from '@/components/media-grid/media-grid';
import MovieCarousel from '@/components/movie-carousel/movie-carousel';
import InfoBox from "@/components/info-box";

export default async function HomePage() {
	const [trendingMovies, topRatedMovies, topRatedTV] = await Promise.all([
		TMDBService.getTrendingMovies(),
		TMDBService.getTopRatedMovies(),
		TMDBService.getTopRatedTV(),
	]);

	return (
		<article>
			<section>
				{trendingMovies ? (
					<MovieCarousel movies={trendingMovies} />
				) : (
					''
				)}
			</section>
			<Section>
				<Heading tag="h2" variant="h3">
					Filmy i seriale:
				</Heading>
				<div>
					{topRatedMovies ? (
						<MediaGrid
							mediaList={topRatedMovies}
							mediaType="movie"
						/>
					) : (
						''
					)}
				</div>
				<div className="pt-5">
					{topRatedTV ? (
						<MediaGrid mediaList={topRatedTV} mediaType="tv" />
					) : (
						''
					)}
				</div>
			</Section>
			<Section>
				<Heading className="mb-12 text-center" tag="h2" variant="h1">
					Płacisz za to, co oglądasz:
				</Heading>
				<InfoBox />
			</Section>
		</article>
	);
}
