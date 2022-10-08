<script setup lang="ts">
import ActivityColumn from "./ActivityColumn.vue";
import Button from "primevue/button";
import TheOutcome from "./TheOutcome.vue";
import AddActivityModal, { type ActivityInputData } from "./AddActivityModal.vue";
import { Activity, useActivityStore } from '../stores/activity';
import { ref } from "vue";

const showModal = ref(false);
const addUseful = ref();

const activityStore = useActivityStore();

function clickHandler(useful: boolean) {
  showModal.value = true;
  addUseful.value = useful;
}

function handleModalConfirmation(input: ActivityInputData) {
  showModal.value = false;

  const activity = new Activity(input.title, input.value, input.duration, addUseful.value);

  activityStore.addActivity(activity);
}

</script>

<template>
  <div class="budget">
    <div class="column-useful">
      <ActivityColumn header="Useful activities" :activities="activityStore.usefulActivities" />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="p-button-success p-button-outlined p-button-sm"
        @click="clickHandler(true)"
      />
    </div>
    <TheOutcome :value="activityStore.outcome" />
    <div class="column-useless">
      <ActivityColumn header="Useless activities" :activities="activityStore.uselessActivities" />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="p-button-danger p-button-outlined p-button-sm"
        @click="clickHandler(false)"
      />
    </div>
    <AddActivityModal :visible="showModal" @confirm="handleModalConfirmation" @hide="showModal=false"/>
  </div>
</template>

<style scoped>
.budget {
  display: flex;
  padding: 2rem;
}
</style>
