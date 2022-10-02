import { combineReducers } from "redux";
import adminReducer from "./admin";
import tokenReducer from "./token";

const rootReducer = combineReducers({
	admin: adminReducer,
	token: tokenReducer
});

export default rootReducer;
