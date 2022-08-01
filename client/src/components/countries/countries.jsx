import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../store/actions/index";
import Country from "../country/country";
import NavBar from "../navBar/navBar";
import Pagination from "../pagination/pagination";
import style from "./countries.module.css";

export default function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const maxPage = Math.ceil(countries.length / perPage);
  const start = (page - 1) * perPage;
  const end = page * perPage;
  let currentCountries;
  if (page === 1) {
    currentCountries = countries.length ? countries.slice(start, 9) : [];
  } else {
    currentCountries = countries.length ? countries.slice(start, end) : [];
  }
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div className={style.container}>
        {currentCountries.length ? (
          currentCountries.map((country) => (
            <Country key={country.id} {...country} />
          ))
        ) : (
          <div>No Countries found. Please reload the page</div>
        )}
      </div>
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
}
