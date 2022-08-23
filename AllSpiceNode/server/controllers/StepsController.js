import { Auth0Provider } from "@bcwdev/auth0provider";
import { stepsService } from "../services/StepsService";
import BaseController from "../utils/BaseController";


export class StepsController extends BaseController {
  constructor() {
    super("api/steps")
    this.router
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createStep)
      .delete('/:id', this.delete)
  }

  async createStep(req, res, next) {
    try {
      let step = await stepsService.createStep(req.body, req.userInfo.id)
      res.send(step)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let step = await stepsService.getById(req.params.id)
      res.send(step)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await stepsService.deleteStep(req.params.id, req.userInfo.id)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}