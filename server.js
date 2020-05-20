const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//setup server port
const port = process.env.PORT || 5000;

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse requests of content-type application/json
app.use(bodyParser.json());

//define root route
app.get('/', (req, res) => {
		res.sendFile(__dirname + '/views/index.html')
		});

//require user routes
const userRoutes = require('./src/routes/user.routes.js');

//use middeware
app.use('/api/users', userRoutes);

app.listen(port, () => {
		console.log(`listening on port ${port}...`);
		});
