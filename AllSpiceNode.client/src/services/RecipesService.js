import { AppState } from "../AppState";
import { api } from "./AxiosService"

class RecipesService {
    async getAllRecipes() {
        let res = await api.get('api/recipes')
        AppState.recipes = res.data
    }
}

export const recipesService = new RecipesService()