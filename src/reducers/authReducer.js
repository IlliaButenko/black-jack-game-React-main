import { SET_CURRENT_USER, SET_GAME_ID } from "../services/types";

const initState = {
	auth: {},
	gameid: "",
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				auth: action.payload,
			};
		case SET_GAME_ID:
			return {
				...state,
				gameid: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
