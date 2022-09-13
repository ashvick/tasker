<script setup lang="ts">
import TaskColumn from "./TaskColumn.vue";
import TheBalance from "./TheBalance.vue";
</script>

<template>
  <div class="budget">
    <TaskColumn />
    <TheBalance :value="12" />
    <TaskColumn />
  </div>
</template>

<style scoped>
.budget {
  display: flex;
  padding: 2rem;
}
</style>
