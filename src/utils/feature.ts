import {MessageResponse} from "../types/api-types.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {NavigateFunction} from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
	| {
			data: MessageResponse;
	  }
	| {
			error: FetchBaseQueryError | SerializedError;
	  };

export const responseToast = (res: ResType, navigate: NavigateFunction | null, url: string) => {
	if ("data" in res) {
		toast.success(res.data.message);
		if (navigate) {
			navigate(url);
		}
	} else if ("error" in res) {
		const error = res.error as FetchBaseQueryError;
		const messageResponse = error.data as MessageResponse;
		toast.error(messageResponse.message);
	}
};

//  Get Last Six Month and Last Twelve Month Name
export const getLastMonth = () => {
	const currentData = moment();
	currentData.date(1);

	const lastSixMonth: string[] = [];
	const lastTwelveMonth: string[] = [];

	for (let i = 0; i < 6; i++) {
		const monthDate = currentData.clone().subtract(i, "months");
		const monthName = monthDate.format("MMMM");
		lastSixMonth.unshift(monthName);
	}

	for (let i = 0; i < 12; i++) {
		const monthDate = currentData.clone().subtract(i, "months");
		const monthName = monthDate.format("MMMM");
		lastTwelveMonth.unshift(monthName);
	}
	return {lastSixMonth, lastTwelveMonth};
};
