import { dbContext } from "../db/DbContext"


class ReviewsService {
    async getRecipeReviews(id) {
        let reviews = await dbContext.Review.find({ recipeId: id })
            .populate('creator')
            .populate('recipe')
        return reviews
    }
    async createReview(body) {
        let review = await dbContext.Review.create(body)
        await review.populate('recipe')
        await review.populate('creator')
        return review
    }

}


export const reviewsService = new ReviewsService()