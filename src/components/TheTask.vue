<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<template>
  <Card>
    <template #title>{{ title }}</template>
    <template #content>value: {{ value }}</template>
  </Card>
</template>
