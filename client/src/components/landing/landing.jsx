import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

export default function Landing() {
  return (
    <div className={style.landing}>
      <h1 className={style.title}>Countries Individual Project</h1>
      <Link to="/country">
        <button className={style.button}>Enter</button>
      </Link>
    </div>
  );
}
