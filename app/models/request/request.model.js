module.exports = (sequelize, Sequelize) => {
	const Request = sequelize.define('request', {
		product_id: {
			type: Sequelize.STRING,
		},
		status: {
			type: Sequelize.STRING,
		},
	});

	return Request;
};
