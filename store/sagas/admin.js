import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchAdmins() {
	try {
		const response = yield fetch("/api/admins");

		const adminList = yield response.json();

		yield put({
			type: t.ADMIN_FETCH_SUCCEEDED,
			payload: adminList.data,
		});
	} catch (error) {
		yield put({
			type: t.ADMIN_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchAdmins() {
	yield takeLatest(t.ADMIN_FETCH_REQUESTED, fetchAdmins);
}

function* addAdmin(action) {
	try {
		const response = yield fetch("/api/admins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newAdmin = yield response.json();

		yield put({
			type: t.ADMIN_ADD_SUCCEEDED,
			payload: newAdmin.data,
		});
	} catch (error) {
		yield put({
			type: t.ADMIN_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddAdmin() {
	yield takeLatest(t.ADMIN_ADD_REQUESTED, addAdmin);
}

function* deleteAdmin(action) {
	try {
		const response = yield fetch("/api/admins/" + action.payload, {
			method: "DELETE",
		});

		const deletedAdmin = yield response.json();

		yield put({
			type: t.ADMIN_DELETE_SUCCEEDED,
			payload: deletedAdmin.data.id,
		});
	} catch (error) {
		yield put({
			type: t.ADMIN_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveAdmin() {
	yield takeLatest(t.ADMIN_DELETE_REQUESTED, deleteAdmin);
}

function* updateAdmin(action) {
	try {
		const response = yield fetch("/api/admins/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedAdmin = yield response.json();

		yield put({
			type: t.ADMIN_UPDATE_SUCCEEDED,
			payload: updatedAdmin.data,
		});
	} catch (error) {
		yield put({
			type: t.ADMIN_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateAdmin() {
	yield takeLatest(t.ADMIN_UPDATE_REQUESTED, updateAdmin);
}

export default function* rootSaga() {
	yield all([
		watchFetchAdmins(),
		watchAddAdmin(),
		watchRemoveAdmin(),
		watchUpdateAdmin(),
	]);
}
