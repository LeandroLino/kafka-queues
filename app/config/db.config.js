require('dotenv').config();

module.exports = {
	HOST: process.env.DATABASE_HOST,
	USER: process.env.DATABASE_USER,
	PASSWORD: process.env.DATABASE_PASSWORD,
	DB: process.env.DATABASE_DB,
	dialect: 'mysql',
	// dialectOptions: {
	//   ssl: {
	//     require: true,
	//     rejectUnauthorized: false,
	//   },
	// },
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
