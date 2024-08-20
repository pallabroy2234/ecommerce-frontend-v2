import {User} from "./types.ts";

export type MessageResponse = {
	success: boolean;
	message: string;
};

export type UserResponse = {
	success: boolean;
	message: string;
	payload: User;
};
