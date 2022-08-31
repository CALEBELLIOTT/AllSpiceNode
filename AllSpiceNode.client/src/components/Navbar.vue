<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-light px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center position-relative">
        <img alt="logo" src="https://i.imgur.com/H4p3VBX.png" class="logo" />
      </div>
    </router-link>



    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item d-flex align-items-center justify-content-center">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'CreateRecipe' }" v-if="account.id">
              <h6 class="text-primary mx-4 nav nav-custom">Upload Recipe</h6>
            </router-link>
          </a>
        </li>
        <!-- <li class="nav-item d-flex align-items-center justify-content-center">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'EmployeesPage' }">
              <h6 class="text-primary mx-4 nav nav-custom">Employees</h6>
            </router-link>
          </a>
        </li> -->

        <li class="nav-item d-flex align-items-center justify-content-center">
          <a class="nav-link" href="#">
            <Login class=""></Login>
          </a>
        </li>
      </ul>
    </div>
  </nav>


  <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>


    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li class="nav-item d-flex align-items-center justify-content-center">
          <a class="nav-link" href="#">
            <router-link :to="{ name: 'CreateRecipe' }" v-if="account.id">
              <h6 class="text-primary mx-4 nav nav-custom">Upload Recipe</h6>
            </router-link>
          </a>
        </li>


      </ul>
      LOGIN COMPONENT HERE
  <Login />
  </div>
  </nav> -->
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.logo {
  height: 3rem;
}
</style>
