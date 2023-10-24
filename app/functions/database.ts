import { DataSource } from "typeorm";
import config from "../config";

export const dataSource = new DataSource({
	url: config.database.connectionString,
	type: "postgres",
	entities: ["src/entity/*.js"],
	migrations: [`${__dirname}/../../migrations/*.{js,ts}`],
	migrationsTableName: "system_migrations",
	logging: true,
	synchronize: true,
});

export default dataSource;
