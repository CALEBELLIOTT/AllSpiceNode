import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class RecipesService {


  async getById(id) {
    let recipe = await dbContext.Recipe.findById(id).populate('creator')
    return recipe
  }
  async getAll() {
    let recipes = await dbContext.Recipe.find().populate("creator")
    return recipes
  }

  async createRecipe(body) {
    let recipe = await dbContext.Recipe.create(body)
    return recipe
  }


  async edit(id, body, userId) {
    let target = await this.getById(id)
    if (!target) {
      throw new BadRequest('Invalid Id')
    }
    if (target.creatorId.toString() != userId) {
      throw new Forbidden("You cannot edit someone else's recipe")
    }
    target.picture = body.picture || target.picture
    target.title = body.title || target.title
    target.subtitle = body.subtitle || target.subtitle
    target.category = body.category || target.category

    let update = await target.save()
    return update
  }

  async delete(id, userId) {
    let target = await this.getById(id)
    if (!target) {
      throw new BadRequest('Invalid Id')
    }
    if (target.creatorId.toString() != userId) {
      throw new Forbidden("you cannot delete someone else's recipe")
    }
    await target.delete()
    return
  }

}


export const recipesService = new RecipesService()