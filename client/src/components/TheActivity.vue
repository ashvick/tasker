<script setup lang="ts">
import type { Activity } from '@/stores/activity.store';
import Card from "primevue/card";

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
        <i class="close-icon pi pi-times" @click="emit('delete', activity._id)"></i>
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

  .close-icon {
    cursor: pointer;
  }

  .content {
      display: block;
  }
  </style>
