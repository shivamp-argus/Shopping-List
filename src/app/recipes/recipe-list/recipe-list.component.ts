import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];
  constructor(private recipeServie: RecipeService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.subscription = this.recipeServie.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    })
    this.recipes = this.recipeServie.getRecipes()

  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
