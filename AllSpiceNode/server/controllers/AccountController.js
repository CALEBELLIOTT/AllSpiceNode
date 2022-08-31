import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:id/recipes', this.getAccountRecipes)
      .get('/:id', this.getOtherUserAccount)
      .get('/:id/recipes', this.getOtherUserRecipes)
      .get('/:id/reviews', this.getOtherUserReviews)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('', this.editAccount)
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

  async editAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
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

  async getOtherUserRecipes(req, res, next) {
    try {
      let recipes = await accountService.getOtherUserRecipes(req.params.id)
      res.send(recipes)
    } catch (error) {
      next(error)
    }
  }

  async getOtherUserReviews(req, res, next) {
    try {
      let reviews = await accountService.getOtherUserReviews(req.params.id)
      res.send(reviews)
    } catch (error) {
      next(error)
    }
  }
}
