<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-2 text-md-start text-center">
                <h3 class="text-primary">Upload a Recipe With AllSpice</h3>
            </div>
        </div>

        <transition>
            <div class="row" v-if="creationStep === 1">
                <div class="col-12">
                    <div class="bg-light rounded p-2 d-flex flex-column">
                        <h5 class="font-weight-bold text-primary">Step 1</h5>
                        <p>Tell us about your recipe...</p>
                        <div class="row">
                            <div class="col-md-6 p-2">
                                <label for="" class="text-dark">Recipe Title</label>
                                <input type="text" class="form-control" v-model="recipeData.title">
                            </div>
                            <div class="col-md-6 p-2">
                                <label for="" class="text-dark">Recipe Sub-title</label>
                                <input type="text" class="form-control" v-model="recipeData.subtitle">
                            </div>
                            <div class="col-md-6 p-2">
                                <label for="" class="text-dark">Recipe Img Url</label>
                                <input type="text" class="form-control" v-model="recipeData.picture">
                            </div>
                            <div class="col-md-6 p-2">
                                <label for="" class="text-dark">Recipe Category</label>
                                <input type="text" class="form-control" v-model="recipeData.category">
                            </div>
                        </div>
                        <button class="btn btn-outline-primary mt-2 align-self-end" @click="submitStepOne()"><i
                                class="mdi mdi-send"></i></button>
                    </div>
                </div>
            </div>
        </transition>


        <transition>
            <div class="row" v-if="creationStep === 2">
                <div class="col-12">
                    <div class="bg-light p-2 rounded">
                        <h5 class="text-primary">Step 2</h5>
                        <p>Add Steps and Ingredients...</p>
                        <div class="row mt-5">
                            <!-- Steps Section -->
                            <div class="col-md-6">
                                <p class="text-primary text-center"><u>Create Steps</u></p>

                                <div class="bg-white rounded my-4 p-2">
                                    <p class="text-muted text-center" v-if="stepsToCreate.length == 0">Add A Step To
                                        Begin...
                                    </p>
                                    <p class="" v-for="s in stepsToCreate">{{ s.position }}) {{ s.body }}</p>
                                </div>

                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Step Description"
                                        aria-label="Step Description" aria-describedby="basic-addon2"
                                        v-model="step.body">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" type="button" @click="addStep()"><i
                                                class="mdi mdi-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <!-- Ingredients Section -->
                            <div class="col-md-6">
                                <p class="text-primary text-center"><u>Create Ingredients</u></p>

                                <div class="bg-white rounded my-4 p-2">
                                    <p class="text-muted text-center" v-if="ingredientsToCreate.length == 0">Add An
                                        Ingredient
                                        To
                                        Begin...
                                    </p>
                                    <p class="" v-for="i in ingredientsToCreate">{{ i.name }}, {{ i.quantity }}</p>
                                </div>
                                <div class="input-group">
                                    <input type="text" aria-label="Ingredient Name" placeholder="Ingredient Name"
                                        class="form-control" v-model="ingredient.name">
                                    <input type="text" aria-label="Ingredient Quantity"
                                        placeholder="Ingredient Quantity" class="form-control"
                                        v-model="ingredient.quantity">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" type="button"
                                            @click="addIngredient()"><i class="mdi mdi-plus"></i></button>
                                    </div>
                                </div>

                            </div>

                            <div class="col-12 d-flex justify-content-end">
                                <button class="btn btn-outline-primary" @click="submitAll()">Add Steps and Ingredients
                                    to Recipe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { ingredientsService } from "../services/IngredientsService";
import { recipesService } from "../services/RecipesService";
import { stepsService } from "../services/StepsService";
import Pop from "../utils/Pop";

export default {
    setup() {
        let recipeData = ref({})
        let step = ref({})
        let ingredient = ref({})
        let router = useRouter()
        return {
            creationStep: computed(() => AppState.creationStep),
            recipeData,
            step,
            ingredient,
            stepsToCreate: computed(() => AppState.stepsToCreate),
            ingredientsToCreate: computed(() => AppState.ingredientsToCreate),
            async submitStepOne() {
                try {
                    console.log('creating');
                    await recipesService.createRecipe(recipeData.value)
                    AppState.creationStep = 2
                } catch (error) {
                    Pop.toast(error.message)
                }
            },
            addStep() {
                if (step.value.body) {
                    step.value.position = AppState.nextStepPosition
                    step.value.recipeId = AppState.createdRecipe.id
                    let data = { body: step.value.body, position: step.value.position, recipeId: step.value.recipeId }
                    AppState.stepsToCreate.push(data)
                    AppState.nextStepPosition++
                    step.value = {}
                } else {
                    Pop.toast('You must add a body to the step', "error")
                }
            },
            addIngredient() {
                if (ingredient.value.name && ingredient.value.quantity) {
                    console.log(ingredient.value);
                    let data = { name: ingredient.value.name, quantity: ingredient.value.quantity, recipeId: AppState.createdRecipe.id }
                    AppState.ingredientsToCreate.push(data)
                    ingredient.value = {}
                } else {
                    Pop.toast('Fill out all form input fields', "error")
                }
            },
            async submitAll() {
                try {
                    await stepsService.createStepsFromArray(AppState.stepsToCreate)
                    await ingredientsService.createIngredientsFromArray(AppState.ingredientsToCreate)
                    function route() {
                        router.push({ name: 'Recipe', params: { id: AppState.createdRecipe.id } })
                        AppState.createdRecipe = {}
                        AppState.ingredientsToCreate = []
                        AppState.stepsToCreate = []
                        AppState.creationStep = 1
                    }
                    setTimeout(route, 1000)
                } catch (error) {
                    Pop.toast(error.message)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>