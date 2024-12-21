const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductsRouter = require('./Routes/ProductsRouter');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send("<h1>Hello world</h1>");
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});