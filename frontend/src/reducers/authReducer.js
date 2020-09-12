import {LOGGED_IN, SET_USER_DATA} from "../actions/types";

const initialState = {
	loggedIn: false,
	userData: {}
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGGED_IN:
			return {...state, loggedIn: action.payload}
		case SET_USER_DATA:
				return {...state, userData: action.payload}
		default:
			return {...state}
	}
}
