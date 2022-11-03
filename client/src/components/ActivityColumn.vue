<script setup lang="ts">
import TheActivity from "./TheActivity.vue";
import { type Activity, useActivityStore } from "@/stores/activity.store";

defineProps<{
  header: string;
  activities: Activity[];
}>();

const activityStore = useActivityStore();

function deleteActivity(id: string) {
  activityStore.deleteActivity(id);
}
</script>

<template>
  <div class="column">
    <h2 class="column-header">{{ header }}</h2>
    <div class="activities">
      <TheActivity
        v-for="activity in activities"
        :activity="activity"
        :key="activity._id"
        @delete="deleteActivity"
      />
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: #495057;
}

.column-header {
  margin-bottom: 1rem;
  text-align: center;
}

.activities {
  display: flex;
  flex-direction: column;
}
</style>
