import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const discoverMoviesRoute = "/discover/movie";
const getMovieDetailsRoute = "/movie";
const searchMoviesRoute = "/search/movie";

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
});

export async function discoverMovies(page) {
    const config = {
        params: {
            page
        }
    }
    const response = await api.get(discoverMoviesRoute, config);
    updateMoviesImages(response.data.results, 200);
    return response.data;
}

export async function getMovieDetails(id) {
    const response = await api.get(`${getMovieDetailsRoute}/${id}`);
    updateMovieImages(response.data, 300);
    return response.data;
}

export async function getMoviesDetails(movieIds) {
    const result = movieIds.map(async (movieId) => await getMovieDetails(movieId));
    return await Promise.all(result);
}

export async function searchMovies(query, page) {
    const config = {
        params: {
            query,
            page
        }
    }
    const response = await api.get(searchMoviesRoute, config);
    updateMoviesImages(response.data.results, 200);
    return response.data;
}

function updateMoviesImages(movies, imageWidth) {
    movies.forEach((movie) => updateMovieImages(movie, imageWidth));
}

function updateMovieImages(movie, imageWidth) {
    movie.backdrop_path = imageBaseUrl + `w${imageWidth}/` + movie.backdrop_path;
    movie.poster_path = imageBaseUrl + `w${imageWidth}/` + movie.poster_path;
}