import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import urlReducer from "./urlReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  url: urlReducer,
});