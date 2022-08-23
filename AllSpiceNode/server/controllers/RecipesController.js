import { Auth0Provider } from "@bcwdev/auth0provider"
import { recipesService } from "../services/RecipesService"
import BaseController from '../utils/BaseController'


export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createRecipe)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
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

  async getAll(req, res, next) {
    try {
      let recipes = await recipesService.getAll()
      res.send(recipes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let recipe = await recipesService.getById(req.params.id)
      res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let recipe = await recipesService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(recipe)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await recipesService.delete(req.params.id, req.userInfo.id)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}