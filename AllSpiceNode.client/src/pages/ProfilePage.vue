<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                    <img :src="profile.picture" :alt="profile.name" class="profile-img mt-5 rounded">
                    <div class="bg-light p-2 rounded align-items-center ms-2">
                        <h1 class="text-primary">{{ profile.name }}</h1>
                        <p class="text-muted m-0">{{ recipes.length }} published <span
                                v-if="recipes.length != 1">recipes</span><span v-else>recipe</span></p>
                        <p class="text-muted m-0">{{ reviews.length }} recipe <span
                                v-if="reviews.length != 1">reviews</span><span v-if="reviews.length == 1">review</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="row mt-5">
            <div class="col-12">
                <h3 class="text-primary m-0">{{ profile.name }}'s Recipes</h3>
                <div class="divider-line mb-2 rounded"></div>
            </div>
            <div class="col-md-4 mt-2" v-for="r in recipes">
                <MediumRecipeCard :recipe=r></MediumRecipeCard>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import MediumRecipeCard from "../components/CardComponents/MediumRecipeCard.vue";

export default {
    async beforeCreate() {
        let route = useRoute();
        await accountService.setActiveAccount(route.params.id);
        await accountService.getAccountRecipes(route.params.id);
        await accountService.getAccountReviews(route.params.id);
    },
    setup() {
        return {
            profile: computed(() => AppState.activeProfile),
            recipes: computed(() => AppState.activeProfileRecipes),
            reviews: computed(() => AppState.activeProfileReviews)
        };
    },
    components: { MediumRecipeCard }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/variables";

.profile-img {
    height: 18rem;
    width: 18rem;
}

.divider-line {
    height: 2px;
    width: 75vw;
    background-color: $primary;
}
</style>