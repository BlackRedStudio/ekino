import TMDB from '@/types/tmdb-types';

import { api } from '../helpers/api-helper';
import { TMDBApiURL, TMDBHeaders } from "@/config/tmdb-config";

const TMDBService = {
	// https://developer.themoviedb.org/reference/trending-movies
	async getTrendingMovies() {
		const data = await api<TMDB.TRes<TMDB.TMovie[]>, { language: string }>(
			`${TMDBApiURL}/trending/movie/week`,
			{
                params: {
                    language: 'pl'
                },
                headers: TMDBHeaders,
            },
		);

        return data?.results.slice(0, 3);
	},
};

export default TMDBService;
