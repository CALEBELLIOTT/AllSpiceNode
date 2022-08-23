import { dbContext } from "../db/DbContext"


class FavoriteService {
  async toggleFavorites(body) {
    let favorite = await this.getByValues(body)
    if (!favorite.id) {
      let newFavorite = await dbContext.Favorite.create(body)
      return newFavorite
    } else {
      await favorite.delete()
      return ('favorite removed')
    }

  }

  async getByValues(favorite) {
    let target = await dbContext.Favorite.find({ recipeId: favorite.id, accountId: favorite.accountId })
    return target
  }

}

export const favoritesService = new FavoriteService()