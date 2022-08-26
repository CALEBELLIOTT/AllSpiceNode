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
                    <!-- TODO havent written this method yet -->
                    <div class="d-flex" @click="navToProfile(recipe.creator.id)">
                        <img :src="recipe.creator?.picture" alt="">
                        <p>{{ recipe.creator?.name }}</p>
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
import { recipesService } from '../services/RecipesService';

export default {
    setup() {
        let route = useRoute()
        onMounted(async () => {
            AppState.activeRecipe = await recipesService.setActiveRecipe(route.params.id)
        })
        onUnmounted(() => {
            AppState.activeRecipe = {}
        })
        return {
            recipe: computed(() => AppState.activeRecipe)
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
</style>