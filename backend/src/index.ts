import express from 'express';
import cors from 'cors';
require('dotenv').config();

import * as RecipeAPI from './recipe-api';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async (req, res) => {
    res.json({ message: 'success' });

});

app.listen(5000, () => {
    console.log('Server running on localhost:5000');
});