<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.store";
import TheActivity from "../components/TheActivity.vue";

const activityStore = useActivityStore();
activityStore.getAllActivities();

</script>

<template>
  <main class="activities">
    <TheActivity v-for="activity in activityStore.activities" :activity="activity" :showDate="true"/>
  </main>
</template>

