import { dbContext } from "../db/DbContext"


class RecipesService {
  async createRecipe(body) {
    let recipe = await dbContext.Recipe.create(body)
    return recipe
  }

}


export const recipesService = new RecipesService()