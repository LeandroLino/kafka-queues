module.exports = (app) => {
	const product = require('../controllers/product/product.controller.js');

	var router = require('express').Router();

	router.get('/', product.health);

	router.get('/list', product.findAll);

	router.post('/async', product.async);

	app.use('/api/product', router);
};
