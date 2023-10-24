import bot from "./telegraf";

const launchPolling = (): void => {
	bot.launch();
};

export { launchPolling };
