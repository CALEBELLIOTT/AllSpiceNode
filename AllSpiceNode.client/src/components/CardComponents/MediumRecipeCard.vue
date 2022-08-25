<template>
    <div class="component">
        <div class="bg-light rounded mb-4 card-container">
            <div class="">
                <img :src="recipe.picture" class="recipe-img rounded-top" @click="navToRecipe(recipe.id)"
                    :alt="recipe.title">
            </div>
            <div class="p-2">
                <h4 class="text-primary">{{ recipe.title }}</h4>
                <p>{{ recipe.subtitle }}</p>
                <div class="d-flex">
                    <p class="text-primary"><span class="text-dark">By: </span><a
                            :href="`/#/profile/${recipe.creator.id}`"><u>{{ recipe.creator.name
                            }}</u></a></p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { router } from '../../router';

export default {
    props: { recipe: { type: Object, required: true } },
    setup() {
        return {
            navToRecipe(id) {
                console.log(id);
                router.push({ name: "Recipe", params: { id } })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.recipe-img {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}

.recipe-img:hover {
    cursor: pointer;
}

// .card-container {}

// .card-container:hover {
//     cursor: pointer;
// }
</style>