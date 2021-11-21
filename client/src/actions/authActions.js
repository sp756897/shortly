import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_URLS,
  FETCH_CLICKS
} from "./types";

export const urlClicks = (user) => dispatch => {
  axios
    .post("/api/users/urlclicks", user)
    .then(res => {
      //console.log(res.data.data)
      dispatch({
        type: FETCH_CLICKS,
        payload: res.data.data
      })
    })
    .catch(err =>
      console.log(err)
    );
};

export const sendUrl = (newUrl, history) => dispatch => {
  axios
    .post("/api/users/teener", newUrl)
    .then(res => history.push("/urllist"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const urlBoard = (user) => dispatch => {
  axios
    .post("/api/users/urlboard", user)
    .then(res => {
      dispatch({
        type: FETCH_URLS,
        payload: res.data.data
      })
    })
    .catch(err =>
      console.log(err)
    );
};


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};