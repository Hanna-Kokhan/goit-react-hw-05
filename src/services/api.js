import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGUzOWQ4ZmVmYTgwZGY2ZTVkYzkxNWM0MzBiM2MyZSIsIm5iZiI6MTc0NTE4MTQ4MC4wMzQsInN1YiI6IjY4MDU1YjI4MDU5ZmJjZWNmNmFhYTZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kDJZTb8C4_SuAG30ckU0Fu-jdYmIuumXq2oUXKOs45c";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&page=${page}`,
    options
  );
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return response.data;
};

export const fetchMovieCredits = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return response.data.results;
};
