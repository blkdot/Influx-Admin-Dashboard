import * as t from "../types";

export const setInfluxModalOpen = (isInfluxModalOpen) => {
	return {
		type: t.INFLUX_MODAL_OPEN,
		payload: isInfluxModalOpen,
	};
};