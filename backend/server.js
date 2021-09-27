const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data.js');
const app = express();
const url = "mongodb+srv://admin:admin@cluster0.8o0od.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const { userRouter } = require('./routers/userRouter.js');
const { orderRouter } = require('./routers/orderRouter.js');
const paypal = require('paypal-rest-sdk');
const clientID_DB = require('./utils.js');
const clientSecret_DB = require('./utils.js');
const clientID_paypal = require('./utils.js');

mongoose.connect(url).then(() => console.log('Connected to DB')).catch((errot) => console.log(error));
paypal.configure({
	'mode': 'sandbox',
	'client_id': clientID_DB,
	'client_secret': clientSecret_DB
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);

app.get("/api/products", (req, res) => {
	res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
	const product = data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found' });
	}
});

app.get('/api/paypal/clientId', (req, res) => {
	res.send({ clientId: clientID_paypal });
});

app.use((err, req, res, next) => {
	const status = err.name && err.name === 'ValidationError' ? 400 : 500;
	res.status(status).send({ message: err.message });
})

app.listen(5000, () => {
	console.log("serve at http://localhost:5000");
});