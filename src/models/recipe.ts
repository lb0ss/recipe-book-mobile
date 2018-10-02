import { Ingredient } from "./ingredient";

export class Recipe {
    constructor(       
        private title: string, 
        private description: string, 
        private difficulty: string,
        private ingredients: Ingredient[]) 
        {
        
        }
 
}