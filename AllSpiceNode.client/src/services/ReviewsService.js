import { AppState } from "../AppState";
import { api } from "./AxiosService"


class ReviewsService {


    async getRecipeReviews(id) {
        const res = await api.get('api/recipes/' + id + '/reviews')
        AppState.activeRecipeReviews = res.data
    }

    getAverageReview() {
        let reviews = AppState.activeRecipeReviews
        let rating = 0
        reviews.forEach(r => {
            rating += r.rating
        })
        rating = rating / reviews.length
        AppState.activeRecipeRating = rating
    }
}

export const reviewsService = new ReviewsService()