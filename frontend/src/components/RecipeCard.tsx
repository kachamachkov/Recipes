import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Props } from "../types";

const RecipeCard = ({ recipe, onClick, onFavoriteButtonClick, isFavorite }: Props) => {

    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image} alt="" />
            <div className="recipe-card-title">
                <span onClick={(event) => {
                    event.stopPropagation();
                    onFavoriteButtonClick(recipe);
                }}>
                    {isFavorite
                        ? <AiFillHeart size={25} color="red" />
                        : <AiOutlineHeart size={25} />
                    }

                </span>
                <h3>{recipe.title}</h3>
            </div>

        </div>
    );

};

export default RecipeCard;