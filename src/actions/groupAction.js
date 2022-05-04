import axios from "axios";
import {
  GET_GROUPS,
  GET_GROUP,
  GET_GROUP_MEMBERS,
  GET_ACCOUNT_GROUPS,
  GET_ERRORS,
} from "./types";

export const getGroups = () => async (dispatch) => {
    const res = await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/groups`);
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  };
  
  export const getGroup = (id) => async (dispatch) => {
    const res = await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/groups/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  };

  export const getGroupMembers = (id) => async (dispatch) => {
    const res = await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/groups/members/${id}`);
    dispatch({
      type: GET_GROUP_MEMBERS,
      payload: res.data,
    });
  };

  export const getAccountGroups = () => async (dispatch) => {
    const res = await axios.get(`http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/showAccountTypes`);
    dispatch({
      type: GET_ACCOUNT_GROUPS,
      payload: res.data,
    });
  };

  export const selectGroup = (SelectGroup, history) => async (dispatch) => {
    try {
      const res = await axios.post("http://ec2-3-25-245-63.ap-southeast-2.compute.amazonaws.com:8000/api/chooseAccountType", SelectGroup);
      setTimeout(() => {
      history.push("/InvDashboard");
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