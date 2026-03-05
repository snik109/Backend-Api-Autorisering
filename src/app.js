require('dotenv').config({ path: "../.env" }); // put JWT_SECRET=Secret i en .env fil
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1.0.0/items', require('./v1.0.0/routes/itemroutes'));
app.use('/api/v1.0.0/accounts', require('./v1.0.0/routes/accountRoutes'));
app.use('/api/v1.0.0/admin', require('./v1.0.0/routes/dashRoutes'));
app.use('/api/v1.0.0/types', require('./v1.0.0/routes/typeRoutes'));
app.use('/api/v1.0.0/stats', require('./v1.0.0/routes/statRoutes'));
app.use('/api/v1.0.0/properties', require('./v1.0.0/routes/propertyRoutes'));
app.use('/api/v1.0.0/recipes', require('./v1.0.0/routes/recipeRoutes'));
app.use('/api/v1.0.0/blocks', require('./v1.0.0/routes/blockRoutes'));
app.use('/api/v1.0.0/recipes', require('./v1.0.0/routes/recipeRoutes'));

app.listen(3872, () => {
    console.log('Server is running on port 3872');
})