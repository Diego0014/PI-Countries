import { useEffect, useState } from "react";
import { getCountries, postActivity } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./createActivity.module.css";
import { Link } from "react-router-dom";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const regex = /^[a-zA-Z\s+]{3,}$/;
  const difficulty = [1, 2, 3, 4, 5];
  const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const season = ["Winter", "Spring", "Summer", "Autumn"];
  const [inputs, setInputs] = useState({
    name: "",
    difficulty: "default",
    duration: "default",
    season: "default",
    countries: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      inputs.name.length > 0 &&
      inputs.countries.length > 0 &&
      inputs.difficulty !== "default" &&
      inputs.duration !== "default" &&
      inputs.season !== "default"
    ) {
      dispatch(postActivity(inputs));
      setInputs({
        name: "",
        difficulty: "default",
        duration: "default",
        season: "default",
        countries: [],
      });
      alert("Activity created successfully");
    } else {
      alert("Please fix the errors");
    }
  };

  const validate = (input) => {
    let errors = {};
    if (input.name === "" || !regex.test(input.name)) {
      errors.name = "Please enter a valid name";
    } else if (input.difficulty === "default") {
      errors.difficulty = "Difficulty is required";
    } else if (input.duration === "default") {
      errors.duration = "Duration is required";
    } else if (input.season === "default") {
      errors.season = "Season is required";
    } else if (Object.keys(input.countries).length <= 0) {
      errors.countries = "Select at least one country";
    }
    return errors;
  };

  const handleSelect = (e) => {
    if (!inputs.countries.includes(e.target.value)) {
      setInputs({
        ...inputs,
        countries: [...inputs.countries, e.target.value],
      });
    } else {
      setErrors(
        validate({
          ...inputs,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleDelete = (country) => {
    setInputs({
      ...inputs,
      countries: inputs.countries.filter((c) => c !== country),
    });
  };

  return (
    <div className={style.createActivity}>
      <h1 className={style.title}>Create Activity</h1>

      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.formContainer}>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                className={style.createActivityInputs}
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={inputs.name}
                onChange={(e) => handleChange(e)}
              />
              <p className={style.error}>{errors.name}</p>
            </div>

            <div>
              <label htmlFor="difficulty">Difficulty</label>
              <select
                className={style.createActivityInputs}
                name="difficulty"
                id="difficulty"
                value={inputs.difficulty.toString()}
                onChange={(e) => handleChange(e)}
              >
                <option value="default">Select difficulty</option>
                {difficulty.map((difficulty) => (
                  <option key={difficulty} value={difficulty.toString()}>
                    {difficulty}
                  </option>
                ))}
              </select>
              <p className={style.error}>{errors.difficulty}</p>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="duration">Duration(hs)</label>
              <select
                className={style.createActivityInputs}
                name="duration"
                id="duration"
                value={inputs.duration.toString()}
                onChange={(e) => handleChange(e)}
              >
                <option value="default">Select duration</option>
                {duration.map((duration) => (
                  <option key={duration} value={duration.toString()}>
                    {duration}
                  </option>
                ))}
              </select>
              <p className={style.error}>{errors.duration}</p>
            </div>

            <div>
              <label htmlFor="season">Season</label>
              <select
                className={style.createActivityInputs}
                name="season"
                id="season"
                value={inputs.season}
                onChange={(e) => handleChange(e)}
              >
                <option value="default">Select season</option>
                {season.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
              <p className={style.error}>{errors.season}</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="countries">Countries</label>
          <div>
            <select
              className={style.selectCountries}
              name="countries"
              id="countries"
              value={{ ...inputs.countries }}
              onChange={(e) => handleSelect(e)}
            >
              <option hidden>Select Countries</option>
              {countries.map((country) => (
                <option key={country.name} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className={style.error}>{errors.countries}</p>
          </div>

          <div className={style.DeleteCountriesInputs}>
            {inputs.countries.map((country) => (
              <div key={country}>
                <button type="button" onClick={() => handleDelete(country)}>
                  <p>
                    {country} <b>X</b>
                  </p>
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className={style.goBackBtn1}>Create</button>
        </div>
      </form>
      <div className={style.createActivityInputs}>
        <Link to="/country">
          <button className={style.goBackBtn}>Back to Countries</button>
        </Link>
      </div>
    </div>
  );
}
