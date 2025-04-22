import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesByQuery } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMoviesByQuery(query, page);

        if (data.results.length === 0 && page === 1) {
          toast.error("No movies found for your query.");
        }

        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
    setPage(1);
    setMovies([]);
    setTotalPages(null);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <main className={css.main}>
      <SearchForm onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {!isLoading && movies.length > 0 && page < totalPages && (
        <button className={css.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
      {!isLoading && page >= totalPages && movies.length > 0 && (
        <p className={css.message}>
          There are no more movies matching your query.
        </p>
      )}
    </main>
  );
};

export default MoviesPage;
