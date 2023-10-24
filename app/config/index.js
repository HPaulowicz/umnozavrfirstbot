module.exports = {
	fallbackLanguageCode: 'en',
	server: {
		port: 5000,
	},
	telegram: {
		username: process.env.TELEGRAM_BOT_USERNAME || 'umnozavrfirstbot',
		token: process.env.TELEGRAM_BOT_TOKEN || '6581613549:AAEdIc3zlfbTE6NLGDShrzQ-dK8Tk7ndk9w',
	},
	mode: 'poll', // or webhook
	webhook: {
		domain: 'umnozavrfirstbot-94768409a996.herokuapp.com',
		url: 'https://umnozavrfirstbot-94768409a996.herokuapp.com:8443',
		port: 8443,
		certsPath: 'certs',
		selfSigned: true
	},
	database: {
		connectionString: process.env.DATABASE_URL || 'postgresql://localdbuser:l0ca1DBPa$$w0rd@localhost:5432/umnozavrfirstbot'
	},
	debug: true,
	log: {
		path: {
			debug_log: './logs/debug.log',
			error_log: './logs/errors.log'
		}
	}
};
