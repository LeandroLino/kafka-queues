const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['kafka:9092'],
});

const producer = kafka.producer(); // Cria a instância do produtor

// Função para conectar o produtor
const connectProducer = async () => {
	await producer.connect();
	console.log('Kafka producer connected successfully.');
};

module.exports = { producer, connectProducer };
