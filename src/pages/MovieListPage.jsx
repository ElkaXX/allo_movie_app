import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { discoverMovies, searchMovies } from '../api';
import ReactPaginate from 'react-paginate';
import Search from '../components/Search';
import TopBarProgress from 'react-topbar-progress-indicator';

function MovieListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [moviesResponse, setMoviesResponse] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    discoverMovies(page)
      .then((response) => {
        setMoviesResponse(response);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [page]);

  const onTextChanged = (text) => {
    searchMovies(text)
      .then((response) => setMoviesResponse(response))
      .catch((error) => console.error(error));
  };

  if (isLoading || moviesResponse === null) {
    return <TopBarProgress />;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Search textChanged={onTextChanged} />
      <ul className="mt-10 grid grid-cols-4 gap-4">
        {moviesResponse.results.map((movie) => (
          <li
            key={movie.id}
            className="w-[200px] text-center bg-zinc-100 border-[1px] border-zinc-200"
          >
            <Link to={`movie/${movie.id}`}>
              <img src={movie.poster_path} alt={movie.title} />
              <p className="mt-1">{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center my-8">
        <ReactPaginate
          pageCount={500}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={'pagination flex justify-center items-center'}
          pageClassName={'flex items-center justify-center w-8 h-8 px-1 border rounded mx-1'}
          activeClassName={'bg-blue-500 text-white'}
          disabledClassName={'opacity-50'}
          previousClassName={'flex items-center justify-center px-1 border rounded mr-1'}
          nextClassName={'flex items-center justify-center border rounded ml-1'}
          previousLinkClassName={'block w-full h-full text-center leading-8'}
          nextLinkClassName={'block w-full h-full text-center px-1 leading-8'}
          breakClassName={'flex items-center justify-center w-8 h-8 px-1 border rounded mx-1'}
          breakLinkClassName={'block w-full h-full text-center leading-8'}
          pageLinkClassName={'block w-[100%] text-center'}
        />
      </div>
    </div>
  );
}

export default MovieListPage;
