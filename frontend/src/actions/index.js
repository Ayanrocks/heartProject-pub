import {LOGGED_IN, SET_USER_DATA, SET_USER_REPORTS} from "./types";

export const setLoggedIn = data => dispatch => {
	dispatch({type: LOGGED_IN, payload: data})
}

export const setUserData = data => dispatch => {
	dispatch({type: SET_USER_DATA, payload: data})
}

export  const setUserReports = data => dispatch => {
	dispatch({type: SET_USER_REPORTS, payload: data})
}
