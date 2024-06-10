import TMDB from '@/types/tmdb-types';
import { TMDBApiURL, TMDBHeaders } from '@/config/tmdb-config';

import { api } from '../helpers/api-helper';

const TMDBService = {
	// https://developer.themoviedb.org/reference/trending-movies
	async getTrendingMovies() {
		const data = await api<TMDB.TRes<TMDB.TMovie[]>, { language: string }>(
			`${TMDBApiURL}/trending/movie/week`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600
					}
				}
			},
		);

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/movie-top-rated-list
	async getTopRatedMovies() {
		const data = await api<
			TMDB.TRes<TMDB.TMovie[]>,
			{ language: string; region: string }
		>(`${TMDBApiURL}/movie/top_rated`, {
			method: 'GET',
			params: {
				language: 'pl',
				region: 'PL',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600
				}
			}
		});

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/tv-series-top-rated-list
	async getTopRatedTV() {
		const data = await api<
			TMDB.TRes<TMDB.TTV[]>,
			{ language: string; }
		>(`${TMDBApiURL}/tv/top_rated`, {
			method: 'GET',
			params: {
				language: 'pl',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600
				}
			}
		});

		return data?.results.slice(0, 3);
	},
};

export default TMDBService;
