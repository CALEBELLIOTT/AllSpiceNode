<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import { categoriesService } from './services/CategoriesService';
import { recipesService } from './services/RecipesService';

export default {
  name: 'App',
  setup() {
    onMounted(async () => {
    })
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
