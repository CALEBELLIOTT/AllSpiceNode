import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  // Home Page
  recipes: [],
  recentFavorites: [],
  categories: {},

  // Recipe Page
  activeRecipe: {},
  activeRecipeReviews: [],
  activeRecipeRating: 0,
  activeRecipeIngredients: [],
  activeRecipeSteps: [],
  activeRecipeAccountRecipes: [],

  // Profile Page
  activeProfile: {},
  activeProfileRecipes: [],
  activeProfileReviews: {}
})
