import { Tag } from './Tag';

export class Food{
    food_id!: string;
    food_name!: string;
    price!: number;

    category_name?: Tag[];
    tags?: Tag[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
}