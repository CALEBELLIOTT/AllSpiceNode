import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"
import { recipesService } from "./RecipesService"


class IngredientsService {



  async createIngredient(id, body) {
    let targetRecipe = await recipesService.getById(body.recipeId)
    if (!targetRecipe) {
      throw new BadRequest("invalid recipe Id")
    }
    if (targetRecipe.creatorId.toString() != id) {
      throw new UnAuthorized("You cannot add an ingredient to another person's recipe")
    }
    let ingredient = await dbContext.Ingredient.create(body)
    return ingredient
  }

  async getById(id) {
    let ingredient = await dbContext.Ingredient.findById(id)
    if (!ingredient) {
      throw new BadRequest("invalid ingredient ID")
    }
    return ingredient
  }

  async deleteIngredient(id, userId) {
    let target = await this.getById(id)
    if (!target) {
      throw new BadRequest("invalid ingredient Id")
    }
    let targetRecipe = await recipesService.getById(target.recipeId)
    if (!targetRecipe) {
      throw new BadRequest("invalid recipe Id")
    }
    if (targetRecipe.creatorId.toString() != userId) {
      throw new UnAuthorized("Can't delete ingredient to another person's recipe")
    }
    await target.delete()
    return
  }


  async getRecipeIngredients(recipeId) {
    let ingredients = await dbContext.Ingredient.find({ recipeId })
    return ingredients
  }

}


export const ingredientsService = new IngredientsService()