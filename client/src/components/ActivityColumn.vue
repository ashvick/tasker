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
    <h3 class="column-header">{{ header }}</h3>
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
  width: 320px;
  gap: 14px;
}

.column-header {
  text-align: center;
}

.activities {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
