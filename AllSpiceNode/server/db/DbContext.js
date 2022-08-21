import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { RecipeSchema } from "../models/Recipe";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Recipe = mongoose.model('Recipe', RecipeSchema)
}

export const dbContext = new DbContext()
