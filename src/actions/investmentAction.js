import axios from "axios";
import { GET_INVESTMENTS_ADMIN, GET_INVESTMENTS} from "./types";

export const getInvestmentsAdmin = () => async (dispatch) => {
  const res = await axios.get("http://ec2-52-64-193-116.ap-southeast-2.compute.amazonaws.com:8000/api/investment");
  dispatch({
    type: GET_INVESTMENTS_ADMIN,
    payload: res.data,
  });
};

export const getInvestments = () => async (dispatch) => {
  const res = await axios.get("http://ec2-52-64-193-116.ap-southeast-2.compute.amazonaws.com:8000/api/investor/investment");
  dispatch({
    type: GET_INVESTMENTS,
    payload: res.data,
  });
};

