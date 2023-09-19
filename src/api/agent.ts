import axios, { AxiosError, AxiosResponse } from "axios";
import { useRef } from "react";

export default function useAxios() {
	
	const instance = useRef(axios.create({
		baseURL: "http://rekrutacjaweb.gigatechspace.net/"
	}));

	// instance.current.interceptors.response.use(null, async (error: AxiosError) => {
	// 	let status, config;

	// 	if (error.response) {
	// 		status = error.response.status;
	// 		config = error.response.config;
	// 	}

	// 	switch (status) {
	// 		case 418:
	// 			console.log("got 418. retrying");
				
	// 			const originalRequest: any = error.config;

	// 			if (!originalRequest || originalRequest._retry) {
	// 				return Promise.reject(error);
	// 			}

	// 			originalRequest._retry = true;

	// 			try {
	// 				return instance.current.request(originalRequest);
	// 			}
	// 			catch (err) {
	// 				return Promise.reject(error);
	// 			}
	// 	}

	// 	return Promise.reject(error);
	// });

	const responseBody = <T>(response: AxiosResponse<T>) => response.data;

	const requests = {
		get: <T>(url: string) => instance.current.get<T>(url).then(responseBody)
	}

	return requests;
}

