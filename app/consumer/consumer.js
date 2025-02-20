const { Kafka } = require('kafkajs');
const db = require('../models');
const Product = db.product;
const Request = db.request;

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
	try {
		await consumer.connect();
		console.log('Consumer connected successfully.');
		await consumer.subscribe({ topic: 'create-product', fromBeginning: true });
		console.log('Subscribed to topic: createProduct');

		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const value = JSON.parse(message.value.toString());
				const product = {
					name: value.product.name,
					value: value.product.value,
				};
				try {
					Product.create(product).then((data) => {
						Request.update(
							{ product_id: data.id, status: 'completed' },
							{ where: { id: value.requstId } }
						);
					});
				} catch (error) {
					console.log;
					Request.update(
						{ status: 'failed' },
						{ where: { id: value.requstId } }
					);
				}
			},
		});
	} catch (error) {
		console.error('Error in Kafka consumer:', error);
	}
};

module.exports = { run };
