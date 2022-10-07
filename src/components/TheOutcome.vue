<script setup lang="ts">
defineProps<{
  value: number;
}>();
</script>

<template>
  <div class="outcome">
    <Badge :value="value" size="xlarge"/>
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
