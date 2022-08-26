<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4">
                    <p class="text-muted m-0">{{ recipe.category }}</p>
                    <h1 class="text-primary mb-0">{{ recipe.title }}</h1>
                    <h1 class="m-0" v-if="reviews.length > 0"><i class="mdi mdi-star text-primary"
                            v-for="index in rating"></i><i class="mdi mdi-star-outline text-primary"
                            v-for="index in 5 - rating"></i></h1>
                    <p class="text-muted">{{ reviews.length }} reviews</p>
                </div>
            </div>
            <div class="col-md-9">
                <img class="recipe-img" :src="recipe.picture" alt="">
            </div>
            <div class="col-md-3 mt-3 mt-md-0">
                <div class="bg-light p-2 rounded">
                    <h4 class="text-primary text-center">Creator</h4>
                    <div class="d-flex align-items-center pointer" @click="navToProfile(recipe?.creatorId)">
                        <img :src="recipe.creator?.picture" class="profile-img" alt="">
                        <div>
                            <p class="ms-2 my-0">{{ recipe.creator?.name }}</p>
                            <p class="ms-2 my-0">Published {{ profileRecipes.length }} recipes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h4 class="text-primary mt-4">What others are saying</h4>
                <div class="row">
                    <p class="text-muted" v-if="reviews.length == 0">No Reviews Yet...</p>
                    <div class="col-md-6 mb-2" v-for="r in reviews">
                        <div class="bg-light p-2 rounded">

                            <div class="d-flex align-items-center">
                                <img :src="r.creator.picture" class="profile-img" height="50" alt="">
                                <p class="my-0 ms-2">{{ r.creator.name }}</p>
                            </div>
                            <h2><i class="mdi mdi-star text-primary" v-for="index in r.rating"></i><i
                                    class="mdi mdi-star-outline text-primary" v-for="index in 5 - r.rating"></i></h2>
                            <p><span class="text-primary font-weight-bold">"</span>{{ r.body }}<span
                                    class="text-primary font-weight-bold">"</span></p>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { router } from '../router';
import { recipesService } from '../services/RecipesService';
import { reviewsService } from '../services/ReviewsService';

export default {
    setup() {
        let route = useRoute()
        onMounted(async () => {
            await recipesService.setActiveRecipe(route.params.id)
            await reviewsService.getRecipeReviews(route.params.id)
            reviewsService.getAverageReview()
            await recipesService.getProfileRecipes(AppState.activeRecipe.creatorId)
        })
        onUnmounted(() => {
            AppState.activeRecipe = {}
            AppState.activeRecipeAccountRecipes = []
            AppState.activeRecipeReviews = []
        })
        return {
            recipe: computed(() => AppState.activeRecipe),
            reviews: computed(() => AppState.activeRecipeReviews),
            rating: computed(() => AppState.activeRecipeRating),
            profileRecipes: computed(() => AppState.activeRecipeAccountRecipes),
            navToProfile(id) {
                router.push({ name: 'Profile', params: { id } })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.recipe-img {
    height: 80vh;
    width: 100%;
    object-fit: cover;
}

.profile-img {
    border-radius: 50%;
}

.pointer {
    cursor: pointer;
}
</style>