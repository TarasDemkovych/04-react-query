import axios from 'axios';
import { type Movie } from '../types/movie';

const myKeyTmdb = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesProps {
  query: string;
  page?: number;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesProps): Promise<MoviesResponse> {
  try {
    const response = await axios.get<MoviesResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query,
          include_adult: false,
          language: 'en-US',
          page,
        },
        headers: {
          Authorization: `Bearer ${myKeyTmdb}`,
          accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
