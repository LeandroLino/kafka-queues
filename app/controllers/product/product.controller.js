const db = require('../../models');
const Product = db.product;
const Request = db.request;
const Op = db.Sequelize.Op;
const { producer, connectProducer } = require('../../producer/producer.js'); // Importe o produtor e a função de conexão

connectProducer().catch(console.error);

// Create and Save a new Product
exports.health = (req, res) => {
	res.status(200).send({
		message: 'OK',
	});
};

exports.async = async (req, res) => {
	const product = {
		name: req.body.name,
		value: req.body.value,
	};

	Request.create({})
		.then(async (data) => {
			await producer.send({
				topic: 'create-product',
				messages: [
					{
						key: null,
						value: JSON.stringify({ product: product, requestId: data.id }),
					},
				],
			});
			res.status(201).send({ requestId: data.id });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			});
		});
};
