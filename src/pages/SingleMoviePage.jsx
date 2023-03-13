import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import * as favoriteService from '../services/favoriteService';
import { getMovieDetails } from '../api';
import { toast } from 'react-toastify';

export default function SingleMoviePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    setIsFavorite(favoriteService.isMovieInFavorite(id));

    getMovieDetails(id)
      .then((response) => setMovieDetails(response))
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleFavoriteButtonClick = () => {
    if (isFavorite) {
      favoriteService.removeMovie(movieDetails.id);
      setIsFavorite(false);
    } else {
      favoriteService.addMovie(movieDetails.id);
      setIsFavorite(true);
    }
  };

  if (isLoading || movieDetails === null) {
    return <TopBarProgress />;
  }

  const buttonClass = isFavorite
    ? 'mt-[130px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
    : 'mt-[130px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';

  return (
    <div className="container mx-auto max-w-4xl pt-10 px-10">
      <div className="flex">
        <img className="max-w-[250px]" src={movieDetails.poster_path} alt={movieDetails.title} />
        <div className="ml-2 p-5 flex justify-between">
          <div>
            <p className="mb-2 font-medium text-lg">Title:</p>
            <p className="mb-2 font-medium text-lg">Original Title:</p>
            <p className="mb-2 font-medium text-lg">Original Language:</p>
            <p className="mb-2 font-medium text-lg">Release Date:</p>
            <p className="font-medium text-lg">Home Page:</p>
            <button className={buttonClass} onClick={handleFavoriteButtonClick}>
              {isFavorite ? 'Favorit Remove' : 'Favorite Add'}
            </button>
          </div>
          <div className="ml-5">
            <p className="mb-2 font-medium text-lg">{movieDetails.title}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.original_title}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.original_language}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.release_date}</p>
            <a className="font-medium text-lg underline" href={movieDetails.homepage}>
              Link
            </a>
          </div>
        </div>
      </div>
      <p className="mt-5">{movieDetails.overview}</p>
    </div>
  );
}
