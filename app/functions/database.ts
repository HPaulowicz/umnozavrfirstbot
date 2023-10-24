import { DataSource } from "typeorm";
import config from "../config";

export const dataSource = new DataSource({
	url: config.database.connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
	type: "postgres",
	entities: [],
	migrations: [`${__dirname}/../../dist/migrations/*.{js}`],
	migrationsTableName: "system_migrations",
	logging: true,
	synchronize: true,
});

export default dataSource;
