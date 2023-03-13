import React, { useEffect, useState } from 'react';
import * as favoriteService from '../services/favoriteService';
import * as api from '../api';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import TopBarProgress from 'react-topbar-progress-indicator';

function FavoritePage() {
  const [isLoading, seIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    seIsLoading(true);
    const favoriteMovieIds = favoriteService.getFavoriteMovies();
    api
      .getMoviesDetails(favoriteMovieIds)
      .then((response) => setMovies(response))
      .catch((error) => console.log(error))
      .finally(() => seIsLoading(false));
  }, []);

  if (isLoading || movies === null) {
    return <TopBarProgress />;
  }

  if (movies.length === 0) {
    return (
      <h1 className="block text-center text-[30px] mt-[30px]">There are no favorite movies</h1>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <MovieList movies={movies.slice((page - 1) * 20, page * 20)} />
      <Pagination
        page={page}
        pageCount={movies.length / 20 > 500 ? 500 : movies.length / 20}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default FavoritePage;
