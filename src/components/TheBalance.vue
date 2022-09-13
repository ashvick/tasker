<script setup lang="ts">
defineProps<{
  value: number;
}>();
</script>

<template>
  <div class="balance">
    <Badge :value="value" size="xlarge"/>
  </div>
</template>

<style scoped>
.balance {
  display: flex;
  width: 400px;
  justify-content: center;
  align-items: center;
}
</style>
