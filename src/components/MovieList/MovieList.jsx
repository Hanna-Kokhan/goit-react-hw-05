import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.card}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={css.link}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : defaultImg
              }
              alt={title}
              className={css.poster}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImg;
              }}
            />
            <span className={css.name}>{title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
