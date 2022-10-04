import { combineReducers } from "redux";
import adminReducer from "./admin";
import influxReducer from "./influencer";

const rootReducer = combineReducers({
	admin: adminReducer,
	influx: influxReducer
});

export default rootReducer;
