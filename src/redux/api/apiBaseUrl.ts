const getApiBaseUrl = (): string => {
	switch (import.meta.env.VITE_NODE_ENV) {
		case "development":
			return import.meta.env.VITE_DEVELOPMENT_URL as string;
		case "production":
			return import.meta.env.VITE_PRODUCTION_URL as string;
		case "testing":
			return import.meta.env.VITE_TESTING_URL as string;
		case "staging":
			return import.meta.env.VITE_STAGING_URL as string;
		default:
			throw new Error("Invalid NODE_ENV value");
	}
};

export const apiBaseUrl: string = getApiBaseUrl();
