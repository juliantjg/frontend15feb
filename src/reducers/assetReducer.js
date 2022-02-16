import {
  GET_ASSET,
  GET_ASSETS,
  GET_PAST_ASSETS,
  GET_ASSETS_ADMIN,
  GET_ASSET_ADMIN,
  GET_USER_ASSETS,
  GET_CURR_USER_ASSETS,
} from "../actions/types";

const initialState = {
  asset: {},
  assets: {},
  pastAssets: {},
  data: {},
  allData: [],
  allPastData: [],
  stats: {},
  invData: [],
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ASSETS:
      return {
        ...state,
        assets: action.payload,
        allData: action.payload.data,
      };
    case GET_ASSETS:
      return {
        ...state,
        assets: action.payload,
        allData: action.payload.data,
      };
    case GET_PAST_ASSETS:
      return {
        ...state,
        pastAssets: action.payload,
        allPastData: action.payload.data,
      };
    case GET_ASSET:
      return {
        ...state,
        asset: action.payload,
        data: action.payload.data,
        invData: action.payload.data.investorsData,
      };
    case GET_ASSETS_ADMIN:
      return {
        ...state,
        assets: action.payload,
        allData: action.payload.data,
        stats: action.payload.extradata,
      };
    case GET_ASSET_ADMIN:
      return {
        ...state,
        asset: action.payload,
        data: action.payload.data,
        invData: action.payload.data.investorsData,
      };
      case GET_CURR_USER_ASSETS:
      return {
        ...state,
        assets: action.payload,
        allData: action.payload.data,
      };
    

    default:
      return state;
  }
};

export default assetReducer;
