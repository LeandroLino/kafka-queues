const express = require('express');
const cors = require('cors');

require('./app/producer/producer');
const { run: runConsumer } = require('./app/consumer/consumer'); // Importe o consumidor

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

// Aguarda 10 segundos antes de tentar conectar ao banco de dados
setTimeout(() => {
	db.sequelize
		.sync()
		.then(() => {
			console.log('Synced db.');
		})
		.catch((err) => {
			console.log('Failed to sync db: ' + err.message);
		});
}, 10000); // 10 segundos

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

require('./app/routes/product.routes')(app);
require('./app/routes/request.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

// Iniciar o consumidor Kafka
setTimeout(() => {
	runConsumer().catch(console.error);
}, 1); // 10 segundos
