const express = require('express');
const jwt = require('jsonwebtoken');
const {loginRoutes} = require('./routes/loginRoutes');
const {dataRoutes} = require('./routes/dataRoutes');
var cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

app.use(loginRoutes);
app.use(dataRoutes);

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port ', port);
});