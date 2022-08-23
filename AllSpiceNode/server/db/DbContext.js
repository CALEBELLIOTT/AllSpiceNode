import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { IngredientSchema } from "../models/Ingredient";
import { RecipeSchema } from "../models/Recipe";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Recipe = mongoose.model('Recipe', RecipeSchema)
  Ingredient = mongoose.model('Ingredient', IngredientSchema)
}

export const dbContext = new DbContext()
