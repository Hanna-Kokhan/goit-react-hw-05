import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

const defaultPoster =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getTrending = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setTrending(data);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setError("Oops, something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getTrending();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Today</h1>

      {isLoading && <Loader />}
      {error && <p className={css.error}>{error}</p>}

      {!isLoading && !error && trending.length > 0 && (
        <ul className={css.list}>
          {trending.map((movie) => (
            <li key={movie.id} className={css.card}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                className={css.link}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : defaultPoster
                  }
                  alt={movie.title}
                  className={css.poster}
                />
                <span className={css.name}>{movie.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
