import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../store/actions";
import style from "./searchBar.module.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(getCountryByName(search));
  }
  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <div className={style.searchBar}>
      <form onSubmit={onSubmit} className={style.searchBar}>
        <input
          type="text"
          value={search}
          onChange={onInputChange}
          placeholder="Search for a country..."
        />
        <input type="submit" value="Search" className={style.submitBtn} />
      </form>
    </div>
  );
}
