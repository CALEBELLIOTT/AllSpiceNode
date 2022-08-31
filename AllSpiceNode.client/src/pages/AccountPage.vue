<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <h3 class="text-primary m-0">Welcome {{ account.name }}!</h3>
        <p class="text-muted">Edit Your Account Information</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-2">
        <label for="">Name</label>
        <input type="text" class="form-control" :placeholder="account.name" v-model="accountUpdate.name">
      </div>
      <div class="col-md-4 mb-2">
        <label for="">Picture</label>
        <input type="text" class="form-control" :placeholder="account.picture" v-model="accountUpdate.picture">
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="updateAccount()"><i class="mdi mdi-check"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
export default {
  name: 'Account',
  setup() {
    let accountUpdate = ref({})
    return {
      account: computed(() => AppState.account),
      accountUpdate,
      async updateAccount() {
        await accountService.updateAccount(accountUpdate)
        accountUpdate.value = {}
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
