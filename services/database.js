import promise from "pg-promise";
import "dotenv/config";

export default function Database() {
	const pgp = promise();
	const db = pgp({
		connectionString: process.env.DB_URL || "postgresql://localhost:5432/codex42",
		ssl: {
			rejectUnauthorized: false
		}
	});

	return db;
}