import { FormEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { AiOutlineSearch } from 'react-icons/ai';

type Tabs = 'search' | 'favorites';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>('search');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteRecipes();

  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log('handle search')
      const recipes = await api.searchRecipes(searchTerm, 1);

      console.log(recipes)
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;

    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {

      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);


    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteRecipe = async (recipe: Recipe) => {

    try {
      await api.removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter((favRecipe) => recipe.id !== favRecipe.id);
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(recipes)
  return (
    <div className='app-container'>
      <div className="header">
        <img src="/hero-image.png" alt="A picture of burger" />
        <div className='title'>Recipes</div>
      </div>
      <div className='tabs'>
        <h1 className={
          selectedTab === 'search' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('search')}
        > Recipe Search</h1>

        <h1 className={
          selectedTab === 'favorites' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('favorites')}
        > Favorites </h1>
      </div>
      {selectedTab === 'search' && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder='Enter a search term ...'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type='submit'><AiOutlineSearch size={40} /></button>
          </form>

          <div className='recipe-grid'>
            {recipes.map((recipe) => {
              const isFavorite = favoriteRecipes.some(
                (favRecipe) => recipe.id === favRecipe.id
              );

              return (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavoriteButtonClick={isFavorite ? removeFavoriteRecipe : addFavoriteRecipe}
                  isFavorite={isFavorite}
                />
              );
            })}
          </div>


          <button
            className='view-more-button'
            onClick={handleViewMore}
          >View More</button>
        </>)}

      {selectedTab === 'favorites' && (
        <div className='recipe-grid'>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteButtonClick={removeFavoriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setSelectedRecipe(undefined)} /> : null}
    </div>
  );
};

export default App;