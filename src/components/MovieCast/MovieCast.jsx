import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [visibleCount, setVisibleCount] = useState(7);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 7);
  };

  const visibleCast = cast.slice(0, visibleCount);

  if (isLoading) return <Loader />;

  return (
    <>
      <ul className={css.list}>
        {visibleCast.map((actor) => (
          <li key={actor.id} className={css.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width="140"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImg;
              }}
            />
            <p className={css.name}>{actor.name}</p>
          </li>
        ))}
      </ul>

      {visibleCount < cast.length && (
        <button className={css.button} onClick={handleShowMore}>
          Show more
        </button>
      )}
    </>
  );
};

export default MovieCast;
