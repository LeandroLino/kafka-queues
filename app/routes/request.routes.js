module.exports = (app) => {
	var router = require('express').Router();
	const db = require('../models');
	const Product = db.product;
	const Request = db.request;

	router.get('/async/:id', (req, res) => {
		Request.findByPk(req.params.id).then((data) => {
			Product.findByPk(data.product_id).then((data) => {
				res.send(data);
			});
		});
	});

	router.get('/list', (req, res) => {
		Request.findAll()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving Products.',
				});
			});
	});

	app.use('/api/request', router);
};
