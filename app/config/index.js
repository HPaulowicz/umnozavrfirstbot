module.exports = {
	fallbackLanguageCode: "en",
	server: {
		port: process.env.SERVER_PORT || 5000,
	},
	homepage: process.env.HOMEPAGE || "https://umnozavrfirstbot-94768409a996.herokuapp.com",
	jwtsecret: process.env.JWT_SECRET || "ILAGdv%AAEdIc3zlfbTE6NLGDShrzQdK8Tk7ndk9w",
	telegram: {
		username: process.env.TELEGRAM_BOT_USERNAME || "umnozavrfirstbot",
		token: process.env.TELEGRAM_BOT_TOKEN || "6581613549:AAEdIc3zlfbTE6NLGDShrzQ-dK8Tk7ndk9w",
	},
	mode: "poll", // or webhook
	database: {
		connectionString: process.env.DATABASE_URL || "postgresql://localdbuser:l0ca1DBPa$$w0rd@localhost:5432/umnozavrfirstbot"
	},
	debug: true,
	log: {
		path: {
			debug_log: "./logs/debug.log",
			error_log: "./logs/errors.log"
		}
	}
};
