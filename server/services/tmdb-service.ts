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
						revalidate: 3600,
					},
				},
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
			params: {
				language: 'pl',
				region: 'PL',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/tv-series-top-rated-list
	async getTopRatedTV() {
		const data = await api<TMDB.TRes<TMDB.TTV[]>, { language: string }>(
			`${TMDBApiURL}/tv/top_rated`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/movie-details
	async getMovieDetails(id: number) {
		const data = await api<
			TMDB.TMovieDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBApiURL}/movie/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/movie-images
	async getMovieImages(id: number) {
		const data = await api<
			TMDB.TImages,
			null
		>(`${TMDBApiURL}/movie/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/tv-series-details
	async getTVDetails(id: number) {
		const data = await api<
			TMDB.TTVDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBApiURL}/tv/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/tv-series-images
	async getTVImages(id: number) {
		const data = await api<
			TMDB.TImages,
			null
		>(`${TMDBApiURL}/tv/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});

		return data;
	},
};

export default TMDBService;
