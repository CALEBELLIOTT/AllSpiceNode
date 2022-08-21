import mongoose from 'mongoose'
import { Schema } from "mongoose";


export const RecipeSchema = new Schema({
  picture: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  creatorId: { type: String, required: true }
}
)

RecipeSchema.virtual("creator", {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})
