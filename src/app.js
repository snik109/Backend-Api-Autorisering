require('dotenv').config({ path: "../.env" }); // put JWT_SECRET=Secret i en .env fil
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1.0.0/items', require('./v1.0.0/routes/itemroutes'));
app.use('/api/v1.0.0/accounts', require('./v1.0.0/routes/accountRoutes'));
app.use('/api/v1.0.0/admin', require('./v1.0.0/routes/dashRoutes'));

app.listen(3872, () => {
    console.log('Server is running on port 3872');
})