import MediaGrid from "@/components/media-grid/media-grid";
import MovieCarousel from "@/components/movie-carousel/movie-carousel";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import TMDBService from "@/server/services/tmdb-service";

export default async function HomePage() {

	const [trendingMovies, topRatedMovies, topRatedTV] = await Promise.all([
		TMDBService.getTrendingMovies(),
		TMDBService.getTopRatedMovies(),
		TMDBService.getTopRatedTV(),
	]);

	return <article>
		<section>{trendingMovies ? <MovieCarousel movies={trendingMovies} /> : ''}</section>
		<Section>
			<Heading tag="h2" variant="h3">Filmy i seriale:</Heading>
			<div>
				{topRatedMovies ? <MediaGrid mediaList={topRatedMovies} mediaType="movie" /> : ''}
			</div>
			<div className="pt-5">
				{topRatedTV ? <MediaGrid mediaList={topRatedTV} mediaType="tv" /> : ''}
			</div>
		</Section>
	</article>;
}
