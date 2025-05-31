import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}



const placeholderImg = "https://placehold.co/300x450?text=No+Image";

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <div onClick={() => onSelect(movie)} className={css.card}>
              <img
                className={css.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : placeholderImg
                }
                alt={movie.title || "Untitled"}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title || "Untitled"}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}