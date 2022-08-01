import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import style from "./navBar.module.css";
import {
  getCountries,
  filterByContinent,
  orderAZ,
  orderPolulation,
  filterByActivityName,
  getActivities,
} from "../../store/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const continents = [
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Africa",
    "Antarctic",
  ];
  const activityName = useSelector((state) => state.activity); 

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    window.location.reload();
  };

  const handleFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
  };

  const handleOrderAZ = (e) => {
    e.preventDefault();
    dispatch(orderAZ(e.target.value));
  };

  const handleOrderPolulation = (e) => {
    e.preventDefault();
    dispatch(orderPolulation(e.target.value));
  };

  const handleFilterByActivityName = (e) => {
    e.preventDefault();
    dispatch(filterByActivityName(e.target.value));
  };

  return (
    <div className={style.container}>
      <div className={style.moduleOneContainer}>
        <div>
          <Link to="/">
            <div className={style.home}></div>
          </Link>
        </div>
        <div>
          <h1 className={style.title}>Countries Individual Project</h1>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className={style.moduleTwoContainer}>
        <div>
          <button
            type="button"
            onClick={handleClick}
            className={style.navBarButton}
          >
            Reload
          </button>
        </div>
        <div>
          <select
            onChange={(e) => handleFilterByContinent(e)}
            className={style.navBarButton}
          >
            <option hidden>Filter by continent</option>
                <option disabled="disabled" default={true} value="">
                Filter by continent
                </option>
            <option value="All">All</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={handleOrderPolulation}
            className={style.navBarButton}
          >
            <option hidden>Order by population</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <select onChange={handleOrderAZ} className={style.navBarButton}>
            <option hidden>Order by name</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleFilterByActivityName}
            className={style.navBarButton}
          >
            <option value="All">Filter by activity</option>
            {activityName.map((act) => (
              <option key={act.id} value={act.name}>
                {act.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Link to="/create" className={style.link}>
            <button className={style.navBarButton}>Create Activity</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
