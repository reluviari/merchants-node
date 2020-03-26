const Pool = require("pg").Pool;
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "node_postgres",
	password: "",
	port: 5432,
});

const getMerchants = () => {
	return new Promise((resolve, reject) => {
		pool.query(
			"SELECT * FROM merchants ORDER BY id ASC",
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(results.rows);
			}
		);
	});
};
const createMerchant = body => {
	return new Promise(function(resolve, reject) {
		const { name, email } = body;
		pool.query(
			"INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
			[name, email],
			(error, results) => {
				if (error) {
					reject(error);
				}

				resolve(
					`A new merchant has been added: ${results.rows[0].name}`
				);
			}
		);
	});
};
const deleteMerchant = param => {
	return new Promise(function(resolve, reject) {
		const id = parseInt(param);
		pool.query(
			"DELETE FROM merchants WHERE id = $1",
			[id],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(`Merchant deleted with ID: ${id}`);
			}
		);
	});
};

module.exports = {
	getMerchants,
	createMerchant,
	deleteMerchant,
};
