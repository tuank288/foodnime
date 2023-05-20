export class Food{
    food_id!: string;
    food_name!: string;
    price!: number;
    category_id!:string;
    category_name!: string;
    created_at!: string;
    updated_at!:string;
    food_image!:string;
    stt!:number;

    favorite!: boolean;
    stars!: number;
    origins!: string[];
    cookTime!: string;
}