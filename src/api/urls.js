export const API_KEY = 'edb14e33dbf6b5a849f1f06b16399595';
export const ROOT_URL = 'https://api.themoviedb.org/3';
const withKey = url => `${ROOT_URL}${url}?api_key=${API_KEY}`;

// Images
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const getW45ImageUrl = imagePath => `${BASE_IMAGE_URL}w45${imagePath}`;
export const getW92ImageUrl = imagePath => `${BASE_IMAGE_URL}w92${imagePath}`;
export const getW185ImageUrl = imagePath => `${BASE_IMAGE_URL}w185${imagePath}`;
export const getW300ImageUrl = imagePath => `${BASE_IMAGE_URL}w300${imagePath}`;
export const getW500ImageUrl = imagePath => `${BASE_IMAGE_URL}w500${imagePath}`;
export const getW780ImageUrl = imagePath => `${BASE_IMAGE_URL}w780${imagePath}`;
export const getW1280ImageUrl = imagePath => `${BASE_IMAGE_URL}w1280${imagePath}`;

// Details
export const getShowDetailsUrl = ({ showId }) => withKey(`/tv/${showId}`);
export const getShowRecommendationsUrl = ({ showId, page = 1 }) => `${withKey(`/tv/${showId}/recommendations`)}&page=${page}`;
export const getSimilarShowsUrl = ({ showId, page = 1 }) => `${withKey(`/tv/${showId}/similar`)}&page=${page}`;

// Sections
export const getPopularShowsUrl = ({ page = 1 }) => `${withKey('/tv/popular')}&page=${page}`;
export const getTopRatedShowsUrl = ({ page = 1 }) => `${withKey('/tv/top_rated')}&page=${page}`;
  
// Search
export const getSearchShowsUrl = ({ page = 1, query }) => `${withKey('/search/tv')}&page=${page}&query=${query}`;

// Imdb
export const getImdbLink = imdbID => `https://www.imdb.com/title/${imdbID}`;