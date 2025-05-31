import { useState } from "react";
import type { Movie } from "../types/movie";

export function useSelectedMovie() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const selectMovie = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return { selectedMovie, selectMovie, closeModal };
}
