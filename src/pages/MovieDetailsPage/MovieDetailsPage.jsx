import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (!movie) return null;

  const {
    title,
    overview,
    genres,
    poster_path,
    release_date,
    production_countries,
    runtime,
    vote_average,
  } = movie;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.back}>
        ← Go back
      </Link>

      <div className={css.card}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          alt={title}
          className={css.poster}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImg;
          }}
        />

        <div className={css.info}>
          <h2 className={css.title}>
            {title} ({release_date?.slice(0, 4)})
          </h2>

          <p className={css.text}>{overview}</p>

          <p className={css.subtitle}>Rating:</p>
          <p className={css.text}>{vote_average?.toFixed(1)} / 10</p>

          <p className={css.subtitle}>Genres:</p>
          <p className={css.text}>{genres.map((g) => g.name).join(", ")}</p>

          <p className={css.subtitle}>Country:</p>
          <p className={css.text}>
            {production_countries.map((c) => c.name).join(", ")}
          </p>

          <p className={css.subtitle}>Duration:</p>
          <p className={css.text}>{runtime} minutes</p>
        </div>
      </div>

      <div className={css.links}>
        <Link to="cast" className={css.link}>
          Cast
        </Link>
        <Link to="reviews" className={css.link}>
          Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
