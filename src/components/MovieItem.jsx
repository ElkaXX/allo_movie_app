import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as favoriteService from '../services/favoriteService';

function MovieItem({ movie, onFavoriteClicked }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoriteService.isMovieInFavorite(movie.id));
  }, [isFavorite, movie.id]);

  const favoriteButtonClick = (event) => {
    event.preventDefault();

    if (isFavorite) {
      favoriteService.removeMovie(movie.id);
      setIsFavorite(false);
    } else {
      favoriteService.addMovie(movie.id);
      setIsFavorite(true);
    }
  };

  return (
    <li className="w-[200px] text-center bg-zinc-100 border-[1px] border-zinc-200">
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster_path} alt={movie.title} />
        <p className="mt-1">{movie.title}</p>
        <button onClick={favoriteButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? 'yellow' : 'white'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      </Link>
    </li>
  );
}

export default MovieItem;
