


import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Banana", 10)
    ];
    getIngredients() {
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientChanged.next(this.ingredients.slice())
    }
    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients)
        this.ingredientChanged.next(this.ingredients.slice())

    }
}