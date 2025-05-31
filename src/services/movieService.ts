import axios from 'axios';
import { type Movie } from '../types/movie';

const myKeyTmdb = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesProps {
  query: string;
  page: number;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies({
  query,
  page,
}: FetchMoviesProps): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${myKeyTmdb}`,
        Accept: 'application/json',
      },
    }
  );
  return response.data;
}
