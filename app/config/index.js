module.exports = {
	fallbackLanguageCode: "en",
	server: {
		port: process.env.PORT || 3000,
	},
	homepage: process.env.HOMEPAGE || "https://umnozavrfirstbot-94768409a996.herokuapp.com",
	jwtsecret: process.env.JWT_SECRET || 'jwt-secret-placeholder',
	telegram: {
		username: process.env.TELEGRAM_BOT_USERNAME,
		token: process.env.TELEGRAM_BOT_TOKEN,
	},
	mode: "poll", // or webhook
	database: {
		connectionString: process.env.DATABASE_URL,
	},
	debug: true,
	log: {
		path: {
			debug_log: "./logs/debug.log",
			error_log: "./logs/errors.log"
		}
	}
};
