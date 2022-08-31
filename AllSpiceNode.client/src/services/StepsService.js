import { AppState } from "../AppState"
import { api } from "./AxiosService"


class StepsService {

  async getRecipeSteps(recipeId) {
    let res = await api.get(`api/recipes/${recipeId}/steps`)
    AppState.activeRecipeSteps = res.data
  }


  async createStepsFromArray(steps) {
    steps.forEach(s => {
      const res = api.post('api/steps', s)
      console.log(res.data);
    })
  }
}


export const stepsService = new StepsService()