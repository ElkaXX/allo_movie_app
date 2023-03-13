import React from 'react';
import MovieItem from '../components/MovieItem';

function MovieList({ movies }) {
  return (
    <ul className="mt-10 grid grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
