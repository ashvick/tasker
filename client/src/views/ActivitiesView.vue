<script setup lang="ts">
  import ActivityColumn from "../components/ActivityColumn.vue";
</script>

<template>
  <div class="activities">
    <!-- <ActivityColumn title="Your activities" :activities="[]"/> -->
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .activities {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
