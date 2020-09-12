import {SET_USER_REPORTS} from "../actions/types";

const initialState = {
	reports: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_USER_REPORTS:
			return {...state, reports: action.payload}
		default:
			return {...state}
	}
}
