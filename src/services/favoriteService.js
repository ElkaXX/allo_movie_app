const favoriteKey = "favorite";

export function addMovie(movieId) {
    const moviesJson = localStorage.getItem(favoriteKey);

    if (moviesJson == null) {
        localStorage.setItem(favoriteKey, JSON.stringify([movieId]));
        return;
    }

    const movies = JSON.parse(moviesJson);
    movies.push(movieId);
    localStorage.setItem(favoriteKey, JSON.stringify(movies));
}

export function removeMovie(movieId) {
    const moviesJson = localStorage.getItem(favoriteKey);

    if (moviesJson == null) {
        return;
    }

    let movies = JSON.parse(moviesJson);
    movies = movies.filter(id => id !== +movieId);
    localStorage.setItem(favoriteKey, JSON.stringify(movies));
}

export function isMovieInFavorite(movieId) {
    const moviesJson = localStorage.getItem(favoriteKey);

    if (moviesJson == null) {
        return false;
    }

    const movies = JSON.parse(moviesJson);

    const result = movies.includes(+movieId);

    return result;
}

export function getFavoriteMovies() {
    const moviesJson = localStorage.getItem(favoriteKey);

    if (moviesJson == null) {
        return [];
    }

    return JSON.parse(moviesJson);
}