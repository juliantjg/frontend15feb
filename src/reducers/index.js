import { combineReducers } from "redux";
import assetReducer from "./assetReducer";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import investmentReducer from "./investmentReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  errors: errorReducer,
  asset: assetReducer,
  security: securityReducer,
  investments: investmentReducer,
  groups: groupReducer,
});
