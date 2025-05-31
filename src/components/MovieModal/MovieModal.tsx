import { useCallback, useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}
const placeholderImage: string =
  "https://armyinform.com.ua/wp-content/uploads/2024/05/45df04fdc242147063b1a9e213f42900.jpeg";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleBackDropClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    function handleEscKey(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (movie == null) {
    return createPortal(
      <div
        onClick={handleBackDropClick}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>
          <button
            onClick={onClose}
            className={css.closeButton}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div className={css.content}>
            <h2>Oops!, something gonna wrong.</h2>
            <p>No movie data available.</p>
          </div>
        </div>
      </div>,
      document.body
    );
  }
  return createPortal(
    <div
      onClick={handleBackDropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={
            movie.backdrop_path !== null
              ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
              : placeholderImage
          }
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(2)}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}