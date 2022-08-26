<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4">
                    <p class="text-muted m-0">{{ recipe.category }}</p>
                    <h1 class="text-primary">{{ recipe.title }}</h1>
                </div>
            </div>
            <div class="col-md-9">
                <img class="recipe-img" :src="recipe.picture" alt="">
            </div>
            <div class="col-md-3 mt-3 mt-md-0">
                <div class="bg-light p-2 rounded">
                    <h4 class="text-primary text-center">Creator</h4>
                    <!-- FIXME This is broken - rendering doesn't wait for the recipe to be set throwing an error -->
                    <!-- <router-link :to="{ name: 'Profile', params: { id: recipe?.creatorId } }"> -->
                    <div class="d-flex align-items-center" @click="navToProfile(recipe?.creatorId)">
                        <img :src="recipe.creator?.picture" class="profile-img" alt="">
                        <div>
                            <p class="ms-2 my-0">{{ recipe.creator?.name }}</p>
                            <p class="ms-2 my-0">Published {{ profileRecipes.length }} recipes</p>
                        </div>
                    </div>
                    <!-- </router-link> -->
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

export default {
    setup() {
        let route = useRoute()
        onMounted(async () => {
            await recipesService.setActiveRecipe(route.params.id)
            await recipesService.getProfileRecipes(AppState.activeRecipe.creatorId)
        })
        onUnmounted(() => {
            AppState.activeRecipe = {}
        })
        return {
            recipe: computed(() => AppState.activeRecipe),
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
</style>