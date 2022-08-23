import mongoose from 'mongoose'
import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const StepSchema = new Schema({
  position: { type: Number, required: true },
  body: { type: String, required: true },
  recipeId: { type: String, required: true }
})