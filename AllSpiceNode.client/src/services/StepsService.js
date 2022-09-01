import { AppState } from "../AppState"
import { api } from "./AxiosService"


class StepsService {

  async getRecipeSteps(recipeId) {
    let res = await api.get(`api/recipes/${recipeId}/steps`)
    AppState.activeRecipeSteps = res.data
  }

  async createStep(step) {
    const res = await api.post('api/steps', step)
    console.log(res.data);
  }



  // FIXME promise all broken - not sure
  async createStepsFromArray(steps) {
    // steps.forEach(s => {
    //   const res = api.post('api/steps', s)
    //   console.log(res.data);
    // })
    let requests = []
    steps.forEach(s => {
      requests.push(this.createStep(s))
    })
    let promises = await Promise.all(requests).then((values) => {
      console.log(values);
    })
    console.log(promises);
  }
}


export const stepsService = new StepsService()