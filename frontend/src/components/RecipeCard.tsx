import { Props } from "../types";

const RecipeCard = ({ recipe, onClick }: Props) => {

    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image} alt="" />
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>

        </div>
    );

};

export default RecipeCard;