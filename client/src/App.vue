<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

fetch('/api/test')
  .then((response) => {
    console.log(response);
  });
</script>

<template>
  <header>
    <nav>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/activities">Activities</RouterLink>
      </div>
      <div class="auth">
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  max-width:  400px;
  min-width: 200px;
}

nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
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

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    width: 100vw;
    padding: 1rem;
  }
}
</style>
