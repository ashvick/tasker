<script setup lang="ts">
import Button from "primevue/button";
import router from "@/router";
</script>

<template>
  <main>
    <div class="content">
      <h1>Tasker</h1>
      <p>Maintain an acceptable level of productivity by striking a balance between useful and useless activities.
      You set yourself goals and a reward for them, and the Tasker helps you achieve them.</p>
      <br>
      <Button label="Sign up" class="button p-button-outlined p-button-lg" @click="router.push('/login');" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
// main {
// }

.content {
  margin: 12rem auto 0 auto;
  max-width: 50vw;
}
</style>
