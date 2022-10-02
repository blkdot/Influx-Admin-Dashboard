import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	adminList: [],
	selectedAdmin: undefined,
	isModalOpen: false,
	isTokenModalOpen: false
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.TOKEN_MODAL_OPEN:
			return {
				...state,
				isTokenModalOpen: action.payload,
			};
		case t.ADMIN_FETCH_SUCCEEDED:
			return {
				...state,
				adminList: action.payload,
			};
		case t.ADMIN_ADD_SUCCEEDED:
			return {
				...state,
				adminList: [action.payload, ...state.adminList],
			};
		case t.ADMIN_UPDATE_SUCCEEDED:
			const updatedAdmin = state.adminList.map((admin) => {
				if (admin._id === action.payload._id) {
					return {
						...admin,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return admin;
			});

			return { ...state, adminList: updatedAdmin};
		case t.ADMIN_DELETE_SUCCEEDED:
			const newAdminList = state.adminList.filter(
				(admin) => admin._id !== action.payload
			);
			return {
				...state,
				adminList: newAdminList,
			};
		case t.ADMIN_SELECTED:
			const selectedadmin = state.adminList.find(
				(admin) => admin._id === action.payload
			);
			return {
				...state,
				selectedAdmin,
			};
		default:
			return state;
	}
};

export default mainReducer;
