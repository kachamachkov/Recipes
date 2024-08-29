export type Recipe = {
    id: number;
    title: string;
    image: string;
    imageType: string;
};

export type Props = {
    recipe: Recipe;
    onClick: () => void;
    onFavoriteButtonClick: (recipe: Recipe) => void;
};

export type RecipeSummary = {
    id: number;
    title: string;
    summary: string;
};