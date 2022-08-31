import { AppState } from "../AppState"
import { api } from "./AxiosService"


class IngredientsService {
  async getRecipeIngredients(recipeId) {
    const res = await api.get(`api/recipes/${recipeId}/ingredients`)
    AppState.activeRecipeIngredients = res.data
  }

  async createIngredientsFromArray(ingredients) {
    ingredients.forEach(i => {
      const res = api.post('api/ingredients', i)
      console.log(res.data);
    })
  }

}


export const ingredientsService = new IngredientsService()