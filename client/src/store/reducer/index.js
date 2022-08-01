import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_NAME,
  GET_COUNTRY_BY_ID,
  POST_ACTIVITY,
  FILTER_BY_CONTINENT,
  ORDER_AZ,
  ORDER_POLULATION,
  GET_ACTIVITIES,
  FILTER_BY_ACTIVITY_NAME,
} from "../../constants/index";

const initialState = {
  countries: [],
  filteredCountries: [],
  countryDetails: [],
  activity: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetails: action.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activity: action.payload,
      };

    case FILTER_BY_ACTIVITY_NAME:
      const allActivitiesName = state.filteredCountries;
      const filterByActivityName =
        action.payload === "All"
          ? allActivitiesName
          : allActivitiesName.filter(
              (country) =>
                country.activities &&
                country.activities.filter(
                  (activity) => activity.name === action.payload
                ).length
            );
      return {
        ...state,
        countries: filterByActivityName,
      };
    case FILTER_BY_CONTINENT:
      const allCountries = state.filteredCountries;
      const filterByContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((cont) => cont.continent === action.payload);
      return {
        ...state,
        countries: filterByContinent,
      };
    case ORDER_AZ:
      const allCountriesAZ = state.countries;
      const orderByName =
        action.payload === "asc"
          ? [...allCountriesAZ].sort((a, b) => a.name.localeCompare(b.name))
          : [...allCountriesAZ].sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        countries: orderByName,
      };
    case ORDER_POLULATION:
      const oderByPopulation =
        action.payload === "asc"
          ? [...state.countries].sort((a, b) => a.population - b.population)
          : [...state.countries].sort((a, b) => b.population - a.population);
      return {
        ...state,
        countries: oderByPopulation,
      };
    default:
      return state;
  }
}
