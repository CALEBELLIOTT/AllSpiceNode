import { Auth0Provider } from "@bcwdev/auth0provider";
import { ingredientsService } from "../services/IngredientsService";
import BaseController from "../utils/BaseController";


export class IngredientsController extends BaseController {
  constructor() {
    super("api/ingredients")
    this.router
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createIngredient)
  }

  async createIngredient(req, res, next) {
    try {
      let ingredient = await ingredientsService.createIngredient(req.userInfo.id, req.body)
      res.send(ingredient)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let ingredients = await ingredientsService.getById(req.params.id)
      res.send(ingredients)
    } catch (error) {
      next(error)
    }
  }
}