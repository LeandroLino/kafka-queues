const express = require('express');
const cors = require('cors');

require('./app/producer/producer');
const { run: runConsumer } = require('./app/consumer/consumer');

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

setTimeout(() => {
	db.sequelize
		.sync()
		.then(() => {
			console.log('Synced db.');
		})
		.catch((err) => {
			console.log('Failed to sync db: ' + err.message);
		});
}, 10000);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

require('./app/routes/product.routes')(app);
require('./app/routes/request.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

setTimeout(() => {
	runConsumer().catch(console.error);
}, 1);
