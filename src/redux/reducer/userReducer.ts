import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserReducerInitialState} from "../../types/reducer-types.ts";
import {User} from "../../types/types.ts";

const initialState: UserReducerInitialState = {
	user: null,
	loading: true,
};

export const userReducer = createSlice({
	name: "userReducer",
	initialState,
	reducers: {
		userExist: (state, {payload}: PayloadAction<User>) => {
			state.loading = false;
			state.user = payload;
		},
		userNotExist: (state) => {
			state.loading = false;
			state.user = null;
		},
	},
});

export const {userExist, userNotExist} = userReducer.actions;
