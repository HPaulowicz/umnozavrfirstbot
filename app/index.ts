import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import * as command from "./functions/commands";
import dataSource from "./functions/database";
import translate from "./i18n/translations";
import config from "./config";

(async () => {
	await dataSource.initialize();
	await dataSource.runMigrations();
	await command.commands();
	await command.adminCommands();
	await command.launch();
})();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/api/v1/welcome", async (req: Request, res: Response) => {
	// Why JWT token? Because we need to transfer user id and get data by that id from telegram to browser
	// meanwhile we need to be sure that the id is not changed and the link has some expiration time
	const { token } = req.query;
	if (!token) {
		res.status(403);
		res.json({ message: "Access denied" });
	}
	let decoded;
	try {
		decoded = jwt.verify(token as string, config.jwtsecret);
	} catch (error) {
		res.status(403);
		return res.json({ message: "Access denied" });
	}
	const { first_name, language_code } = decoded as any;

	// Can be something like const user = await dataSource.query('SELECT first_name, language_code FROM users WHERE telegram_id = $1 AND deleted_at IS NULL', [ telegram_id ]);
	// But as I understand it is not necessary for this task
	// if (!user) {
	// 	res.status(404);
	// 	// res.json({ message: translate('generic_error_message', {}, language_code) });
	// }
	return res.json({ message: translate("website_welcome_message", { name: first_name }, language_code) });
});

const port = config.server.port;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
