import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
	AllUsersResponse,
	DeleteUserRequest,
	MessageResponse,
	UserResponse,
} from "../../types/api-types.ts";
import {User} from "../../types/types.ts";
import {apiBaseUrl} from "./apiBaseUrl.ts";
import axios from "axios";

export const userAPI = createApi({
	reducerPath: "userApi",
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiBaseUrl}/api/v1/user`,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		/**
		 * @description         Login user
		 * @path                /api/v1/user/new
		 * @method              POST
		 * @access              Public
		 * @invalidatesTags     User
		 *
		 * */
		login: builder.mutation<MessageResponse, User>({
			query: (user) => ({
				url: "/new",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),

		/**
		 * @description         Delete user by admin
		 * @path                /api/v1/user/${userId}?id=${id}
		 * @method              DELETE
		 * @access              Private (Admin)
		 * @invalidatesTags     User
		 * */
		deleteUserByAdmin: builder.mutation<MessageResponse, DeleteUserRequest>({
			query: ({userId, id}) => ({
				url: `/${userId}?id=${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),

		/**
		 *@description         Get all users for admin dashboard
		 * @path                /api/v1/user/all?id=${id}
		 * @method              GET
		 * @access              Private (Admin)
		 * @provideTags         User
		 * */
		getAllUserByAdmin: builder.query<AllUsersResponse, string>({
			query: (id) => ({
				url: `/all?id=${id}`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
	}),
});

export const getUser = async (id: string) => {
	try {
		const {data}: {data: UserResponse} = await axios.get(`${apiBaseUrl}/api/v1/user/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const {useLoginMutation, useDeleteUserByAdminMutation, useGetAllUserByAdminQuery} = userAPI;
