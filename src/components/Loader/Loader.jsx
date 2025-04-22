import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <FadeLoader color="#ff6b08" size={100} />
    </div>
  );
};

export default Loader;
