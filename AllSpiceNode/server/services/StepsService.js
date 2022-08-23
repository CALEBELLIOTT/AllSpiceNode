import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"
import { recipesService } from "./RecipesService"


class StepsService {
  async createStep(body, userId) {
    let targetRecipe = await recipesService.getById(body.recipeId)
    if (!targetRecipe) {
      throw new BadRequest("invalid recipe id")
    }
    if (targetRecipe.creatorId.toString() != userId) {
      throw new UnAuthorized("you cannot add a step to another person's recipe")
    }
    let step = await dbContext.Step.create(body)
    return step
  }

}

export const stepsService = new StepsService()