import React, { useState } from "react";
import style from "./pagination.module.css";

export default function Pagination({ page, setPage, maxPage }) {
  const [input, setInput] = useState(1);
  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };
  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
    }
    if (
      parseInt(e.target.value) < 1 ||
      parseInt(e.target.value) > maxPage ||
      isNaN(parseInt(e.target.value))
    ) {
      setPage(1);
      setInput(1);
    } else {
      setPage(parseInt(e.target.value));
    }
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={style.container}>
      <button
        disabled={page <= 1}
        className={style.btn}
        name="Prev"
        onClick={prevPage}
      >
        Prev
      </button>
      <input
        className={style.inputBar}
        type="number"
        name="page"
        autoComplete="off"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={input}
      />
      <p>Page of {maxPage}</p>
      <button
        disabled={page >= Math.ceil(maxPage)}
        className={style.btn}
        name="Next"
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
