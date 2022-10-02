import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	isTokenModalOpen: false
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case t.TOKEN_MODAL_OPEN:
			return {
				...state,
				isTokenModalOpen: action.payload,
			};
		default:
			return state;
	}
};

export default mainReducer;
