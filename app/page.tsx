import TMDBService from "@/server/services/tmdb-service";

export default async function HomePage() {

	const trendingMovies = await TMDBService.getTrendingMovies();

	console.log(trendingMovies);

	return <article>
		<section>Homepage</section>
	</article>;
}
