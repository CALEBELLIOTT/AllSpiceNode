<template>
  <!-- <div class="hero-img">
  </div> -->

  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="bg-light rounded p-2 mt-md-5 mt-3">
          <h4 class="text-center text-primary">Our Recent Favorites</h4>
          <SmallRecipeCard v-for="r in recentFavorites" :recipe="r" :key="r.id"></SmallRecipeCard>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-light p-2 mt-md-5 mt-3">
          <h4 class="text-center text-primary">Our Newest Recipe</h4>
          <img :src="newestRecipe?.picture" class="newest-recipe-img" alt="">
          <div>
            <h4 class="text-center mt-2 text-primary fw-bold">{{ newestRecipe?.title }}</h4>
          </div>
          <p class="mt-3">{{ newestRecipe?.subtitle }}</p>
          <div class="d-flex mt-3 align-items-center justify-content-between">
            <div>
              <button class="btn btn-primary">Learn More</button>
            </div>
            <div class="d-flex align-items-center">
              <img class="creator-img" :src="newestRecipe?.creator.picture" alt="">
              <p class="m-0 ms-2">{{ newestRecipe?.creator.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="p-2 mt-md-5 mt-3 bg-light">
          <h4 class="text-center text-primary">Explore Categories</h4>
          <p v-for="(value, key, index) in categories" class="category-text">{{ key }} ({{ value }})</p>
        </div>
      </div>
    </div>


    <div class="row mt-5">
      <div class="col-md-4" v-for="r in recipes">
        <MediumRecipeCard :recipe=r></MediumRecipeCard>
      </div>
    </div>
  </div>


</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import SmallRecipeCard from '../components/CardComponents/SmallRecipeCard.vue';
import { categoriesService } from '../services/CategoriesService';
import { recipesService } from '../services/RecipesService'
import MediumRecipeCard from '../components/CardComponents/MediumRecipeCard.vue';

export default {
  setup() {
    onMounted(async () => {
      await recipesService.getAllRecipes()
      categoriesService.getAllCategories()
      recipesService.randomFiveRecipes()
    })
    return {
      recipes: computed(() => AppState.recipes),
      recentFavorites: computed(() => AppState.recentFavorites),
      newestRecipe: computed(() => AppState.recipes[AppState.recipes.length - 1]),
      categories: computed(() => AppState.categories)
    };
  },
  components: { SmallRecipeCard, MediumRecipeCard }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.newest-recipe-img {
  height: 50vh;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.creator-img {
  border-radius: 50%;
  height: 4rem;
  transition: 200ms;
}

.category-text:hover {
  cursor: pointer;
  color: $primary;
  transition: 200ms;
}
</style>
