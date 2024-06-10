namespace TMDB {
    export type TRes<TData> = {
        page: number;
        results: TData;
        total_pages: number;
        total_results: number;
    }
    export type TMovie = {
      backdrop_path: string;
      id: number;
      original_title: string;
      overview: string;
      poster_path: string;
      media_type: string;
      adult: boolean;
      title: string;
      original_language: string;
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
    export type TTV = {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      origin_country: string[];
      original_language: string;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string;
      first_air_date: string;
      name: string;
      vote_average: number;
      vote_count: number;
    };
    
}

export default TMDB;
