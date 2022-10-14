<script setup lang="ts">
import Badge from "primevue/badge";

defineProps<{
  value: number;
}>();

function badgeColor(value: number) {
  if (0 > value) return "danger";
  if (0 <= value && 5 >= value) return "warning";
  return "success";
}
</script>

<template>
  <div class="outcome">
    <Badge :value="value" size="xlarge" :severity="badgeColor(value)" />
  </div>
</template>

<style scoped>
.outcome {
  display: flex;
  width: 400px;
  justify-content: center;
  align-items: center;
}
</style>
