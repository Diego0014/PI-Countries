import axios from "axios";
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

export const getCountries = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/api/country");
    dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  };
};

export const getCountryByName = (name) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/api/country?name=${name}`
    );
    dispatch({
      type: GET_COUNTRY_BY_NAME,
      payload: response.data,
    });
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/api/country/${id}`);
    dispatch({
      type: GET_COUNTRY_BY_ID,
      payload: response.data,
    });
  };
};

export const postActivity = (activity) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/api/activity",
      activity
    );
    dispatch({
      type: POST_ACTIVITY,
      payload: response.data,
    });
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/api/activity");
    dispatch({
      type: GET_ACTIVITIES,
      payload: response.data,
    });
  };
};

export const filterByActivityName = (activityName) => {
  return {
    type: FILTER_BY_ACTIVITY_NAME,
    payload: activityName,
  };
};

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};

export const orderAZ = (order) => {
  return {
    type: ORDER_AZ,
    payload: order,
  };
};

export const orderPolulation = (order) => {
  return {
    type: ORDER_POLULATION,
    payload: order,
  };
};
