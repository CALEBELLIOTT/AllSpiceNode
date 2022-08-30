<template>
    <div class="component">
        <div class="p-2 bg-light whole-container" @click="navToRecipe(recipe.id)">
            <div class="row">
                <div class="col-6">
                    <img class="recipe-img" :src="recipe.picture" :alt="recipe.subtitle">
                </div>
                <div class="col-6 d-flex align-items-center">
                    <div class="">
                        <p>{{ recipe.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRouter } from "vue-router";
import { router } from '../../router';
export default {
    props: { recipe: { type: Object, required: true } },
    setup() {
        let router = useRouter()
        return {
            navToRecipe(id) {
                router.push({ name: "Recipe", params: { id } })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.recipe-img {
    width: 100%;
    height: 7rem;
    object-fit: cover;
    border-radius: 3px;
}

.whole-container:hover {
    cursor: pointer;
}
</style>