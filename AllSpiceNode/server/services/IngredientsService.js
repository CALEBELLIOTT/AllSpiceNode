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

}


export const ingredientsService = new IngredientsService()