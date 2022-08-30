<template>

</template>


<script>
import { useRoute } from "vue-router";
import { accountService } from "../services/AccountService";

export default {
    async beforeCreate() {
        let route = useRoute()
        await accountService.setActiveAccount(route.params.id)
    },
    setup() {
        return {
        }
    }
}
</script>


<style lang="scss" scoped>
</style>