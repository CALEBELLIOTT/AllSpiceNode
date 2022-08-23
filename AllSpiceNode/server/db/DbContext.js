import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { IngredientSchema } from "../models/Ingredient";
import { RecipeSchema } from "../models/Recipe";
import { StepSchema } from "../models/Step";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Recipe = mongoose.model('Recipe', RecipeSchema)
  Ingredient = mongoose.model('Ingredient', IngredientSchema)
  Step = mongoose.model('Step', StepSchema)
}

export const dbContext = new DbContext()
