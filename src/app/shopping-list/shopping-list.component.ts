import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangedSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {

  }
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangedSub = this.shoppingListService.ingredientChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          console.log(this.ingredients)
        }
      );
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }
  ngOnDestroy(): void {
    this.idChangedSub.unsubscribe();
  }

}
