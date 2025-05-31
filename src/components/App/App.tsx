import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../services/movieService';
import ReactPaginate from 'react-paginate';
import type { Movie } from '../../types/movie';

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const closeModal = () => setSelectedMovie(null);
  const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
  const handleSearch = async (query: string) => {
    setQuery(query);
    setPage(1);
  };
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);

  

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          disabledClassName={css.disabled}
          nextLabel="→"
previousLabel="←"
        />
      )}

      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data?.results} onSelect={handleSelectMovie} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
