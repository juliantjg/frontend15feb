import axios from "axios";
import { GET_ERRORS, GET_ASSETS, GET_PAST_ASSETS, GET_ASSET, GET_ASSETS_ADMIN, GET_ASSET_ADMIN, GET_USER_ASSETS, GET_CURR_USER_ASSETS} from "./types";

export const createAsset = (asset, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8000/api/asset/create", asset);
    setTimeout(() => {
    history.push("/AMDashboard");
  }, 2000);
    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } 
  catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getAssets = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/verified/asset");
  dispatch({
    type: GET_ASSETS,
    payload: res.data,
  });
};

export const getPastAssets = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/pastOfferings");
  dispatch({
    type: GET_PAST_ASSETS,
    payload: res.data,
  });
};

export const getAsset = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/asset/${id}`);
  dispatch({
    type: GET_ASSET,
    payload: res.data,
  });
};

export const getAdminAssets = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/api/admin/asset");
  dispatch({
    type: GET_ASSETS_ADMIN,
    payload: res.data,
  });
};

export const getAdminAsset = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/admin/asset/${id}`);
  dispatch({
    type: GET_ASSET_ADMIN,
    payload: res.data,
  });
};

export const getUserAssets = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/user/assets/${id}`);
  dispatch({
    type: GET_USER_ASSETS,
    payload: res.data,
  });
};

export const getCurrUserAssets = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/api/asset`);
  dispatch({
    type: GET_CURR_USER_ASSETS,
    payload: res.data,
  });
};