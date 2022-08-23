import mongoose from 'mongoose'
import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const FavoriteSchema = new Schema({
  accountId: { type: ObjectId, required: true },
  recipeId: { type: ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

FavoriteSchema.virtual('recipe', {
  localField: 'recipeId',
  ref: 'Recipe',
  foreignField: 'id',
  justOne: true
})
