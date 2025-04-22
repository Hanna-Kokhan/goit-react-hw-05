import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      toast.error("Enter a search query");
      return;
    }

    const isGarbage = /^[^a-zA-Z0-9а-яА-Я]+$/.test(trimmed);
    if (isGarbage) {
      toast.error("Please enter a valid query");
      return;
    }

    onSubmit(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search movies..."
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
