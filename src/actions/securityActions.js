import axios from "axios";
import setToken from "../securityUtils/setToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_USERS,
  GET_USER,
  CHECK_TOKEN,
} from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8000/api/register", newUser);
    setTimeout(() => {
      history.push("/SignIn");
    }, 2000);
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const checkToken = () => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8000/api/checkToken");
    dispatch({
      type: CHECK_TOKEN,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    //post => login request
    const res = await axios.post(
      "http://localhost:8000/api/login",
      LoginRequest
    );
    //extract token from data
    const token = res.data.data.token;
    console.log(res);
    //store token in local storage
    localStorage.setItem("token", token);
    //set token in header
    setToken(token);
    //get data from response
    const decoded = {
      name: res.data.data.name,
      id: res.data.data.id,
    };
    var decoded2 = jwt_decode(token);
    /* console.log(decoded2); */

    localStorage.setItem("id", decoded.id);
    localStorage.setItem("scopes", decoded2.scopes);
    localStorage.setItem("userName", decoded.name);

    const res2 = await axios.post("http://localhost:8000/api/checkToken");
    localStorage.setItem("tokenIsValid", res2.data.message);
    console.log(res2.data);

    //dispatch to securityReducer
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const adminLogin = (LoginRequest) => async (dispatch) => {
  try {
    //post => login request
    const res = await axios.post(
      "http://localhost:8000/api/adminLogin",
      LoginRequest
    );
    //extract token from data
    const token = res.data.data.token;
    console.log(res);
    //store token in local storage
    localStorage.setItem("token", token);
    //set token in header
    setToken(token);
    //get data from response
    const decoded = {
      name: res.data.data.name,
      id: res.data.data.id,
    };
    localStorage.setItem("id", decoded.id);
    //dispatch to securityReducer
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = (history) => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/logout");
  localStorage.clear();
  setToken(false);
  history.push("/SignIn");    
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  setToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
};

export const getUsers = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/users`);
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const getUser = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/${id}`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

export const updateUser = (id, updateUser) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8000/api/user/${id}`, updateUser);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const resetPwEmail = (EmailRequest) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/forgotPasswordEmail",
      EmailRequest
    );
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const resetPw = (PasswordRequest) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/changePassword",
      PasswordRequest
    );
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const verifyEmail = (VerifyToken) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/verifyEmail",
      VerifyToken
    );
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* export const getNotifications = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/notification/showAll`);
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: res.data,
  });
}; */
