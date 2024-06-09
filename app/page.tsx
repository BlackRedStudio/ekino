import MovieCarousel from "@/components/movie-carousel/movie-carousel";
import TMDBService from "@/server/services/tmdb-service";

export default async function HomePage() {

	const trendingMovies = await TMDBService.getTrendingMovies();

	console.log(trendingMovies);

	return <article>
		<section>{trendingMovies ? <MovieCarousel movies={trendingMovies} /> : ''}</section>
	</article>;
}
