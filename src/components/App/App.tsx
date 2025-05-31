import { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useMovies } from "../../hooks/useMovies";
import { useSelectedMovie } from "../../hooks/useSelectedMovie";

export default function App() {
  const { movies, isLoading, isError, searchMovies } = useMovies();
  const { selectedMovie, selectMovie, closeModal } = useSelectedMovie();

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={searchMovies} />

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={selectMovie} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
