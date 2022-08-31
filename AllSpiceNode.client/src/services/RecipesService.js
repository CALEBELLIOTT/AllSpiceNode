import { AppState } from "../AppState";
import { api } from "./AxiosService"

class RecipesService {
    async getAllRecipes() {
        let res = await api.get('api/recipes')
        AppState.recipes = res.data
    }

    async setActiveRecipe(id) {
        let res = await api.get("api/recipes/" + id)
        AppState.activeRecipe = res.data
    }

    async randomFiveRecipes() {
        let recipes = []
        for (let i = 0; i < 5; i++) {
            let target = AppState.recipes[Math.floor(Math.random() * AppState.recipes.length)]
            if (recipes.includes(target)) {
                i--
            } else {
                recipes.push(target)
            }
        }
        AppState.recentFavorites = recipes
    }

    async getProfileRecipes(id) {
        let res = await api.get('account/' + id + "/recipes")
        AppState.activeRecipeAccountRecipes = res.data
    }

    async createRecipe(data) {
        const res = await api.post('api/recipes', data)
        console.log(res.data);
        AppState.createdRecipe = res.data
    }
}

export const recipesService = new RecipesService()