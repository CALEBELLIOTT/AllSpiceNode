import { dbContext } from "../db/DbContext"


class RecipesService {
  async getAll() {
    let recipes = await dbContext.Recipe.find().populate('creator')
    return recipes
  }

  async createRecipe(body) {
    let recipe = await dbContext.Recipe.create(body)
    return recipe
  }

}


export const recipesService = new RecipesService()