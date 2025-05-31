import { useState } from "react";
import { fetchMovies } from "../services/movieService"
import { toast } from "react-hot-toast";
import type { Movie } from "../types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchMovies = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);

    try {
      const data = await fetchMovies({ query });
      if (data.results.length === 0) {
        throw new Error("No movies found for your request.");
      }
      setMovies(data.results);
    } catch (error) {
      toast.error(`${error}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, isError, searchMovies };
}
