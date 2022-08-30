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
        </div>

    </div>
</template>


<script>
export default {
    props: { r: { type: Object, required: true } },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.profile-img {
    border-radius: 50%;
}
</style>