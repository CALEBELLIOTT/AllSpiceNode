import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:id/recipes', this.getAccountRecipes)
      .get('/:id', this.getOtherUserAccount)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/favorites', this.getUserFavorites)
      .get('/recipes', this.getUserRecipes)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserFavorites(req, res, next) {
    try {
      let favorites = await accountService.getFavorites(req.userInfo.id)
      res.send(favorites)
    } catch (error) {
      next(error)
    }
  }


  async getUserRecipes(req, res, next) {
    try {
      let recipes = await accountService.getUserRecipes(req.userInfo.id)
      res.send(recipes)
    } catch (error) {
      next(error)
    }
  }

  async getOtherUserAccount(req, res, next) {
    try {
      let account = await accountService.getOtherUserAccount(req.params.id)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountRecipes(req, res, next) {
    try {
      let recipes = await accountService.getUserRecipes(req.params.id)
      res.send(recipes)
    } catch (error) {
      next(error)
    }
  }
}
