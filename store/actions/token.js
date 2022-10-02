import * as t from "../types";

export const setTokenModalOpen = (isTokenModalOpen) => {
	return {
		type: t.TOKEN_MODAL_OPEN,
		payload: isTokenModalOpen,
	};
};