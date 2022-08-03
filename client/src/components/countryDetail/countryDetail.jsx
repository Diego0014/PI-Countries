import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../store/actions";
import style from "./countryDetail.module.css";
import NavBar from "../navBar/navBar";
export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let country = useSelector((state) => state.countryDetails);
  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  return (
    <>
      <NavBar />
      <div>
        {country.length > 0 ? (
          <div className={style.container}>
            <div className={style.detailsHeader}>
              <h3 className={style.flagName}>{country.name}</h3>
              <img
                src={country.flag}
                alt={country.name}
                className={style.flag}
              />
              <div className={style.detailsInfo}>
                <p className={style.parraph}>{country.continent}</p>
              </div>
            </div>
            <div className={style.detailsBody}>
              <div className={style.detailsBodyInfo}>
                <h3 className={style.title}>Details</h3>
                <p className={style.parraph}>
                  <b>Capital:</b> {country.capital}
                </p>
                <p className={style.parraph}>
                  <b>Subregion:</b> {country.subregion}
                </p>
                <p className={style.parraph}>
                  <b>Area:</b> {country.area} km
                </p>
                <p className={style.parraph}>
                  <b>Population:</b> {country.population}{" "}
                </p>
              </div>
              <div className={style.detailsBody}>
                <h3 className={style.title}>Activities</h3>
                {country.activities ? (
                  country.activities.map((activity) => (
                    <ul key={activity.id}>
                      <li key={activity.id}>
                        <p className={style.parraph}>
                          You can do {activity.name} in {activity.season} for
                          around {activity.duration}hs in this country.
                        </p>
                        <p className={style.parraph}>
                          Level of difficulty: {activity.difficulty}
                        </p>
                      </li>
                    </ul>
                  ))
                ) : (
                  <p className={style.parraph}>
                    No activities found for this country
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
