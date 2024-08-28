export type Recipe = {
    id: number;
    title: string;
    image: string;
    imageType: string;
};

export type Props = {
    recipe: Recipe;
};