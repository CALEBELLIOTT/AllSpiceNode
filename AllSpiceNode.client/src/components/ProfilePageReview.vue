<template>
    <div class="component">
        <div class="bg-light p-2 rounded">
            <div class="d-flex align-items-center">
                <img :src="r.creator.picture" class="profile-img" height="50" alt="">
                <p class="my-0 ms-2">{{ r.creator.name }}</p>
            </div>
            <h2><i class="mdi mdi-star text-primary" v-for="index in r.rating"></i><i
                    class="mdi mdi-star-outline text-primary" v-for="index in 5 - r.rating"></i></h2>
            <p><span class="text-primary font-weight-bold">"</span>{{ r.body
            }}<span class="text-primary font-weight-bold">"</span></p>
            <!-- <p class="text-muted m-0">Commented On</p> -->
            <div class="row clickable" @click="navToRecipe(r.recipe.id)">
                <div class="col-md-6">
                    <div class="img-container d-flex">
                        <img :src="r.recipe.picture" alt="" class="recipe-img rounded">
                    </div>
                </div>
                <div class="col-md-6 d-flex flex-column justify-content-around">
                    <p class="font-weight-bold text-primary m-0">{{ r.recipe.title }}</p>
                    <p class="m-0 text-muted">{{ r.recipe.category }}</p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
    props: { r: { type: Object, required: true } },
    setup() {
        let router = useRouter()
        return {
            navToRecipe(id) {
                router.push({ name: 'Recipe', params: { id } })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.profile-img {
    border-radius: 50%;
}

.recipe-img {
    height: 5rem;
    width: 10rem;
    object-fit: cover;
}

.img-container {
    max-width: 100%;
}

.clickable:hover {
    cursor: pointer;
}
</style>