declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string;
		DIRECT_URL: string;
		API_PREFIX: string;
		SUPABASE_SERVICE_KEY: string;
		HOST: string;
		PORT: string;
	}
}
