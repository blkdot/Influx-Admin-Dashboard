import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	isInfluxModalOpen: false
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case t.INFLUX_MODAL_OPEN:
			return {
				...state,
				isInfluxModalOpen: action.payload,
			};
		default:
			return state;
	}
};

export default mainReducer;
