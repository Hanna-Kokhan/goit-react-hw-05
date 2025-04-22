import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>404 — Page not found</h2>
      <Link to="/" className={css.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
