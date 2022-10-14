<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth.store";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav v-if="authStore.user">
      <div>
        <RouterLink to="/balance">Balance</RouterLink>
        <RouterLink to="/activities">Activities</RouterLink>
      </div>
      <a @click="authStore.logout">Logout</a>
    </nav>
    <nav v-else>
      <RouterLink to="/">Home</RouterLink>
      <div>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  padding-right: calc(var(--section-gap) / 2);
  line-height: 1.5;
  max-height: 100vh;
  max-width: 400px;
  min-width: 200px;
}

nav {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 1rem;
  font-size: 1.2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

a {
  cursor: pointer;
}
</style>
