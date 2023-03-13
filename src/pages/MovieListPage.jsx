import React, { useEffect, useState } from 'react';
import * as api from '../api';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import MovieList from '../components/MovieList';
import TopBarProgress from 'react-topbar-progress-indicator';

function MovieListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [moviesResponse, setMoviesResponse] = useState(null);

  useEffect(() => {
    discoverMovies();
  }, []);

  useEffect(() => {
    if (searchText === null || searchText === '') {
      discoverMovies();
    } else {
      searchMovies(searchText);
    }
  }, [searchText, page]);

  const discoverMovies = () => {
    setIsLoading(true);
    api
      .discoverMovies(page)
      .then((response) => setMoviesResponse(response))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const searchMovies = (query) => {
    setIsLoading(true);
    api
      .searchMovies(query, page)
      .then((response) => setMoviesResponse(response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleOnSearchTextChanged = (text) => {
    setPage(1);
    setSearchText(text);
  };

  if (isLoading || moviesResponse === null) {
    return <TopBarProgress />;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Search textChanged={handleOnSearchTextChanged} searchText={searchText} />
      <MovieList movies={moviesResponse.results} />
      <Pagination
        page={page}
        pageCount={moviesResponse.total_pages > 500 ? 500 : moviesResponse.total_pages}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default MovieListPage;
