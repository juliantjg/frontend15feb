import { GET_INVESTMENTS_ADMIN, GET_INVESTMENTS } from "../actions/types";

const initialState = {
    investments: {},
    data: [],
    stats: {},
};

const investmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTMENTS_ADMIN:
      return {
        ...state,
        investments: action.payload,
        data: action.payload.data,
      };
    case GET_INVESTMENTS:
      return {
        ...state,
        investments: action.payload,
        data: action.payload.data,
        stats: action.payload.extradata,
      };
    default:
      return state;
  }
};

export default investmentReducer;
