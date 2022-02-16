import { GET_GROUP, GET_GROUPS, GET_GROUP_MEMBERS, GET_ACCOUNT_GROUPS} from "../actions/types";

const initialState = {
  groups: {},
  group: {},
  data: [],
  userData: [],
//   userAssets: [],
//   userInvestments: [],
};
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        data: action.payload.data,
      };
    case GET_GROUP:
      return {
        ...state,
        group: action.payload,
        userData: action.payload.data,
        // userAssets: action.payload.data.assets,
        // userInvestments: action.payload.data.investments,
      };
    case GET_GROUP_MEMBERS:
      return {
        ...state,
        group: action.payload,
        data: action.payload.data,
      };
    case GET_ACCOUNT_GROUPS:
      return {
        ...state,
        groups: action.payload,
        data: action.payload.data,
      };

    default:
      return state;
  }
}

export default groupReducer;
