import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getMovieDetails } from '../api';
import { toast } from 'react-toastify';

export default function SingleMoviePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    getMovieDetails(id)
      .then((response) => setMovieDetails(response))
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading || movieDetails === null) {
    return <TopBarProgress />;
  }

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
            <button className="mt-[130px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Add to favorite
            </button>
          </div>
          <div className="ml-5">
            <p className="mb-2 font-medium text-lg">{movieDetails.title}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.original_title}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.original_language}</p>
            <p className="mb-2 font-medium text-lg">{movieDetails.release_date}</p>
            <a className="font-medium text-lg underline" href={movieDetails.homepage}>
              {movieDetails.homepage}
            </a>
          </div>
        </div>
      </div>
      <p className="mt-5">{movieDetails.overview}</p>
    </div>
  );
}
