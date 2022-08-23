import { Auth0Provider } from "@bcwdev/auth0provider";
import { stepsService } from "../services/StepsService";
import BaseController from "../utils/BaseController";


export class StepsController extends BaseController {
  constructor() {
    super("api/steps")
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createStep)
  }

  async createStep(req, res, next) {
    try {
      let step = await stepsService.createStep(req.body, req.userInfo.id)
      res.send(step)
    } catch (error) {
      next(error)
    }
  }
}