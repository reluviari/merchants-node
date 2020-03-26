const { Pool } = require("pg");

const pool = new Pool({
	user: "reluviari",
	host: "localhost",
	database: "node_postgres",
	password: "kkopee34",
	port: 5432,
});
pool.connect((err, client, release) => {
	if (err) {
		return console.error("Error acquiring client", err.stack);
	}
	// SELECT * FROM merchants ORDER BY id ASC
	client.query("SELECT * FROM merchants ORDER BY id ASC", (err, result) => {
		// release();
		if (err) {
			return console.error("Error executing query", err.stack);
		}
		console.log(result.rows);
	});
});
