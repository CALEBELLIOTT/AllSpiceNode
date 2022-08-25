import { AppState } from "../AppState";
import { api } from "./AxiosService"

class RecipesService {
    async getAllRecipes() {
        let res = await api.get('api/recipes')
        AppState.recipes = res.data
    }

    async randomFiveRecipes() {
        let recipes = []
        for (let i = 0; i < 5; i++) {
            let target = AppState.recipes[Math.floor(Math.random() * AppState.recipes.length)]
            recipes.push(target)
        }
        AppState.recentFavorites = recipes
    }
}

export const recipesService = new RecipesService()