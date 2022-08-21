import { Auth0Provider } from "@bcwdev/auth0provider"
import { recipesService } from "../services/RecipesService"
import BaseController from '../utils/BaseController'


export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createRecipe)
  }

  async createRecipe(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let recipe = await recipesService.createRecipe(req.body)
      res.send(recipe)
    } catch (error) {
      next(error)
    }
  }
}