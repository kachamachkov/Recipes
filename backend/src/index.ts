import express from 'express';
import cors from 'cors';
require('dotenv').config();

import * as RecipeAPI from './recipe-api';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async (req, res) => {
    const searchterm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);

    const results = await RecipeAPI.searchRecipes(searchterm, page);
    return res.json(results);
});

app.listen(5000, () => {
    console.log('Server running on localhost:5000');
});