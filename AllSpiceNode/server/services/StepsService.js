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

  async getById(id) {
    let step = await dbContext.Step.findById(id)
    if (!step) {
      throw new BadRequest('Invalid step id')
    }
    return step
  }

  async deleteStep(id, userId) {
    let target = await this.getById(id)
    let targetRecipe = await recipesService.getById(target.recipeId)
    if (targetRecipe.creatorId.toString() != userId) {
      throw new UnAuthorized("cannot delete a step to another person's recipe")
    }
    await target.delete()
    return
  }


  async getRecipeSteps(recipeId) {
    let steps = await dbContext.Step.find({ recipeId })
    return steps
  }


}

export const stepsService = new StepsService()