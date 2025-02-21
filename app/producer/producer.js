const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
	await producer.connect();
	console.log('Kafka producer connected successfully.');
};

module.exports = { producer, connectProducer };
