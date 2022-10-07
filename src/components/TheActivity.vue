<script setup lang="ts">
import type { Activity } from '@/stores/activity';

defineProps<{
  activity: Activity;
}>();

const emit = defineEmits(['delete'])
</script>

<template>
  <Card style="width: 20rem; margin-bottom: 1em">
    <template #title>
      <div class="title">
        <span>{{ activity.title }}</span>
        <i class="pi pi-times" @click="emit('delete', activity.id)"></i>
      </div>
    </template>
    <template #content>
      <div class="content">
        <p>Value per hour: {{ activity.value }}</p>
        <p>Duration: {{ activity.duration }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
  }
  .content {
      display: block;
  }
  </style>
