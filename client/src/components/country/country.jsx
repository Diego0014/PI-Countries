import React from "react";
import { Link } from "react-router-dom";
import style from "./country.module.css";


export default function Country({ id, name, flag, continent }) {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <Link to={`/country/${id}`}>
          <img className={style.imgContainer} src={flag} alt={name} />
        </Link>
      </div>
      <div className={style.countryInfo}>
        <h3>{name}</h3>
        <p>{continent}</p>
      </div> 
    </div>
  );
}
