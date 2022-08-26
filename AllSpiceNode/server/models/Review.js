import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const ReviewSchema = new Schema({
    creatorId: { type: ObjectId, required: true },
    recipeId: { type: ObjectId, required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    body: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })

ReviewSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

ReviewSchema.virtual('recipe', {
    localField: 'recipeId',
    ref: 'Recipe',
    foreignField: '_id',
    justOne: true
})