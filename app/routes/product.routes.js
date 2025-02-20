module.exports = (app) => {
	const product = require('../controllers/product/product.controller.js');

	var router = require('express').Router();

	// Conectar o produtor ao Kafka

	// Create a new product
	router.get('/', product.health);

	// Rota para enviar mensagens ao Kafka
	router.post('/async', product.async);

	app.use('/api/product', router);
};
