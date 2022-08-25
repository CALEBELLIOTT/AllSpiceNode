import { Logger } from "sass"
import { dbContext } from "../db/DbContext"


class FavoriteService {
  async toggleFavorites(body, userId) {
    let favorite = await this.getByValues(body, userId)
    if (!favorite) {
      body.accountId = userId
      let newFavorite = await dbContext.Favorite.create(body)
      await newFavorite.populate('recipe')
      await newFavorite.recipe.populate('creator')

      return newFavorite
    } else {
      await this.deleteFavorite(favorite.id)
      return ('favorite removed')
    }

  }

  async getByValues(body, userId) {
    let target = await dbContext.Favorite.findOne({ recipeId: body.recipeId, accountId: userId })
    return target
  }

  async deleteFavorite(id) {
    await dbContext.Favorite.deleteOne({ id })
    return
  }

}

export const favoritesService = new FavoriteService()