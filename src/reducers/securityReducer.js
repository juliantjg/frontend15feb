import { GET_LOGOUT_STATUS, SET_CURRENT_USER, GET_USERS, GET_USER,
} from "../actions/types";

const initialState = {
  user: {},
  users: {},
  /* notifications: [], */
  singleUser: {},
  data: [],
  userData: [],
  validToken: false,
  userAssets: [],
  userInvestments: [],
  logoutStatus: "",
};

const booleanPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function setUser(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanPayload(action.payload),
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        data: action.payload.data,
      };
    case GET_USER:
      return {
        ...state,
        singleUser: action.payload,
        userData: action.payload.data,
        userAssets: action.payload.data.assets,
        userInvestments: action.payload.data.investments,
      };

    case GET_LOGOUT_STATUS:
      return {
        ...state,
        logoutStatus: action.payload.data,
      } 
      /* case GET_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
          data: action.payload.data,
        }; */

    default:
      return state;
  }
}
