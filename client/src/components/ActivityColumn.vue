<script setup lang="ts">
import TheActivity from "./TheActivity.vue";
import { Activity, useActivityStore } from '../stores/activity';

const props = defineProps<{
  header: string,
  activities: Activity[]
}>()

const activityStore = useActivityStore();

function deleteActivity(id: string) {
  activityStore.deleteActivity(id);
}

</script>

<template>
  <div class="column">
    <div class="column-header">{{ header }}</div>
    <div class="activities">
      <TheActivity v-for="activity in activities" :activity="activity" @delete="deleteActivity"/>
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.activities {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
