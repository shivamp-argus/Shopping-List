


import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Banana", 10)
    ];
    getIngredients() {
        return this.ingredients.slice();
    }
    getIngredient(index: number) {
        return this.ingredients[index];
    }
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientChanged.next(this.ingredients.slice())
    }
    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients)
        this.ingredientChanged.next(this.ingredients.slice())
    }
    updateIngredients(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice())
    }
}