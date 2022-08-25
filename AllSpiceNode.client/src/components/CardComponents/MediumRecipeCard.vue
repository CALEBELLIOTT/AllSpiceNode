<template>
    <div class="component">
        <div class="bg-light rounded mb-4 card-container">
            <div class="">
                <img :src="recipe.picture" class="recipe-img rounded-top" alt="">
            </div>
            <div class="p-2">
                <h4 class="text-primary">{{ recipe.title }}</h4>
                <p>{{ recipe.subtitle }}</p>
                <div class="d-flex">
                    <p class="text-primary"><span class="text-dark">By: </span><u>{{ recipe.creator.name }}</u></p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    props: { recipe: { type: Object, required: true } },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.recipe-img {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}

.card-container {
    transition: 300ms;
}

.card-container:hover {
    cursor: pointer;
    transform: scale(1.005);
    transition: 300ms;
}
</style>