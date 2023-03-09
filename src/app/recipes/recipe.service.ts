import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            "Mexican Hotpot",
            "This is a eatable item",
            "https://source.unsplash.com/random/?Food/",
            [
                new Ingredient('Meat', 5),
                new Ingredient('Milk', 3)
            ]),
        new Recipe(
            "Mojito",
            "This is drinkable item",
            "https://source.unsplash.com/random/?Drink/",
            [
                new Ingredient('Soda', 7),
                new Ingredient('Mint', 4)
            ])
    ];
    constructor(private shoppingListService: ShoppingListService) {

    }
    getRecipes() {
        return this.recipes.slice();
    }
    addIngToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);

    }

}