import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const setInfluxModalOpen = (isInfluxModalOpen) => {
	return {
		type: t.INFLUX_MODAL_OPEN,
		payload: isInfluxModalOpen,
	};
};

export const fetchAdmins = () => {
	return {
		type: t.ADMIN_FETCH_REQUESTED,
	};
};

export const addAdmin = (admin) => {
	return {
		type: t.ADMIN_ADD_REQUESTED,
		payload: admin,
	};
};

export const updateAdmin = (admin) => {
	return {
		type: t.ADMIN_UPDATE_REQUESTED,
		payload: admin,
	};
};

export const deleteAdmin = (id) => {
	return {
		type: t.ADMIN_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedAdmin = (id) => {
	return {
		type: t.ADMIN_SELECTED,
		payload: id,
	};
};
