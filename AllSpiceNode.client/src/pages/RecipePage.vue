<template>



    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4">
                    <p class="text-muted m-0">{{ recipe.category }}</p>
                    <h1 class="text-primary mb-0">{{ recipe.title }}</h1>
                    <h1 class="m-0" v-if="reviews.length > 0"><i class="mdi mdi-star text-primary"
                            v-for="index in Math.floor(rating)"></i><i class="mdi mdi-star-outline text-primary"
                            v-for="index in 5 - Math.floor(rating)"></i></h1>
                    <p class="text-muted">{{ reviews.length }} reviews</p>
                </div>
            </div>
            <div class="col-md-9">
                <img class="recipe-img" :src="recipe.picture" alt="">
            </div>
            <div class="col-md-3 mt-3 mt-md-0">
                <div class="bg-light p-2 rounded">
                    <h4 class="text-primary text-center">Published By</h4>
                    <div class="d-flex align-items-center pointer" @click="navToProfile(recipe?.creatorId)">
                        <img :src="recipe.creator?.picture" class="profile-img" alt="">
                        <div>
                            <p class="ms-2 my-0">{{ recipe.creator?.name }}</p>
                            <p class="ms-2 my-0">{{ profileRecipes.length }} recipes published</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-6">
                <div class="bg-light rounded p-2 mt-4">
                    <h4 class="text-primary text-center m-0"><i class="mdi mdi-chef-hat"></i> Recipe Ingredients</h4>
                    <div class="divider-line"></div>
                    <div class="mt-4">
                        <div class="mb-2">
                            <ul>
                                <li v-for="i in ingredients" :key="i.id">{{ i.name }}, {{ i.quantity }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="bg-light rounded p-2 mt-4">
                    <h4 class="text-primary text-center m-0"><i class="mdi mdi-format-list-numbered"></i> Recipe Steps
                    </h4>
                    <div class="divider-line"></div>
                    <div class="mt-4">
                        <div class="d-flex mb-2" v-for="s in steps" :key="s.id">
                            <p><span class="bg-primary text-light p-2 step-background">{{ s.position }}</span> {{ s.body
                            }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="row">
            <div class="col-12">
                <h4 class="text-primary mt-4">What Others Are Saying</h4>
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
                            <p><span class="text-primary font-weight-bold">"</span>{{ r.body
                            }}<span class="text-primary font-weight-bold">"</span></p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <h4 class="m-0 text-primary">Made This Recipe?</h4>
                <p class="text-muted m-0">leave a review</p>
                <p class="mt-3 text-muted text-center mb-5" v-if="!account.id">Sign in to leave a review...</p>
                <div class="d-flex align-items-center" v-if="account.id">
                    <h1><i class="mdi mdi-star text-primary" v-for="i in parseInt(newReview.rating)"></i><i
                            class="mdi mdi-star-outline text-primary"
                            v-for="index in 5 - parseInt(newReview.rating)"></i></h1>
                    <select name="" id="" class="form-select select ms-2" v-model="newReview.rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="newReview.body"
                    v-if="account.id" placeholder="Tell us about your experience..."></textarea>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-outline-primary mt-2 mb-5" @click="createReview()"
                        v-if="account.id">Submit</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { router } from '../router';
import { recipesService } from '../services/RecipesService';
import { reviewsService } from '../services/ReviewsService';
import { stepsService } from '../services/StepsService';
import { ingredientsService } from '../services/IngredientsService';

export default {
    async beforeCreate() {
        let route = useRoute()
        await recipesService.setActiveRecipe(route.params.id)
        await reviewsService.getRecipeReviews(route.params.id)
        await reviewsService.getAverageReview()
        await recipesService.getProfileRecipes(AppState.activeRecipe.creatorId)
        await stepsService.getRecipeSteps(route.params.id)
        await ingredientsService.getRecipeIngredients(route.params.id)
    },
    setup() {
        let router = useRouter()
        let newReview = ref({ rating: 0 })
        onMounted(async () => {
        })
        watchEffect(() => {
            AppState.activeRecipeReviews
            reviewsService.getAverageReview()
        })
        onUnmounted(() => {
            AppState.activeRecipe = {}
            AppState.activeRecipeAccountRecipes = []
            AppState.activeRecipeReviews = []
            AppState.activeRecipeRating = 0
            AppState.activeRecipeIngredients = []
            AppState.activeRecipeSteps = []
        })
        return {
            recipe: computed(() => AppState.activeRecipe),
            reviews: computed(() => AppState.activeRecipeReviews),
            rating: computed(() => AppState.activeRecipeRating),
            newReview,
            account: computed(() => AppState.account),
            profileRecipes: computed(() => AppState.activeRecipeAccountRecipes),
            ingredients: computed(() => AppState.activeRecipeIngredients),
            steps: computed(() => AppState.activeRecipeSteps),
            navToProfile(id) {
                router.push({ name: 'Profile', params: { id } })
            },
            createReview() {
                newReview.value.recipeId = AppState.activeRecipe.id
                console.log(newReview.value);
                reviewsService.createReview(newReview.value)
                newReview.value = { rating: 0 }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/variables";

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

.select {
    height: 2.5rem;
    width: 4rem;
}

.divider-line {
    background-color: $primary;
    height: 2px;
    width: 75%;
    margin: auto;
    margin-top: 4px;
    border-radius: 2px;
}

.step-background {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
}

ul {
    list-style: none;
}

ul li::before {
    content: "\2022";
    color: $primary;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
}
</style>