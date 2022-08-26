import { Auth0Provider } from "@bcwdev/auth0provider";
import { reviewsService } from "../services/ReviewsService";
import BaseController from "../utils/BaseController";

export class ReviewsController extends BaseController {
    constructor() {
        super('api/reviews')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createReview)
    }


    async createReview(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            let review = await reviewsService.createReview(req.body)
            res.send(review)
        } catch (error) {
            next(error)
        }
    }
}