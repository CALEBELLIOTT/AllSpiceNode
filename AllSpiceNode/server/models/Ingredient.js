import mongoose from 'mongoose'
import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const IngredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  recipeId: { type: ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

IngredientSchema.virtual('recipe', {
  localField: 'recipeId',
  ref: "Account",
  foreignField: "id",
  justOne: true
})