import { Auth0Provider } from "@bcwdev/auth0provider";
import { favoritesService } from "../services/FavoritesService";
import BaseController from "../utils/BaseController";


export class FavoritesController extends BaseController {
  constructor() {
    super('api/favorites')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.toggleFavorite)
  }

  async toggleFavorite(req, res, next) {
    try {
      let response = await favoritesService.toggleFavorites(req.body)
      res.send(response)
    } catch (error) {
      next(error)
    }
  }
}