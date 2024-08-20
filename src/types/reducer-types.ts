import {User} from "./types.ts";

export interface UserReducerInitialState {
	user: User | null;
	loading: boolean;
}
