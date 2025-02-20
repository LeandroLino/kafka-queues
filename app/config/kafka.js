const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['kafka:9092'],
});

const producer = kafka.producer().connect();

/*const run = async () => {
	await producer.connect();
	await producer.send({
		topic: 'test-topic',
		messages: [{ value: 'Hello KafkaJS user!' }],
	});

	console.log('Message sent successfully');
	await producer.disconnect();
};*/

module.exports = producer;
