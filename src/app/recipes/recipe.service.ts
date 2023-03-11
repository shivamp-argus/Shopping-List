import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
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
    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }
    addIngToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe
        this.recipeChanged.next(this.recipes.slice())
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipeChanged.next(this.recipes.slice())
    }

}