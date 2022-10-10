<script setup lang="ts">
import ActivityColumn from "./ActivityColumn.vue";
import Button from "primevue/button";
import Calendar from 'primevue/calendar';
import TheOutcome from "./TheOutcome.vue";
import AddActivityModal from "./AddActivityModal.vue";
import { useActivityStore, type Activity } from '../stores/activity.store';
import { ref } from "vue";

const showModal   = ref(false);
const isAddUseful = ref();
const date        = ref(new Date(Date.now()));

const activityStore = useActivityStore();

activityStore.getActivities(date.value);

function dateSelect(date: Date) {
  activityStore.getActivities(date);
}

function clickHandler(useful: boolean) {
  showModal.value   = true;
  isAddUseful.value = useful;
}

function handleModalConfirmation(inputData: Partial<Activity>) {
  showModal.value  = false;
  inputData.useful = isAddUseful.value;
  inputData.date   = date.value;

  activityStore.addActivity(inputData);
}

</script>

<template>
  <div class="balance">
    <div class="column-useful">
      <ActivityColumn header="Useful activities" :activities="activityStore.usefulActivities" />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="p-button-success p-button-outlined p-button-sm"
        @click="clickHandler(true)"
      />
    </div>
    <div class="balance-container">
      <Calendar v-model="date" @date-select="dateSelect" />
      <TheOutcome class="outcome" :value="activityStore.outcome" />
    </div>
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
.balance {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
.column-useless {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.balance-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.date {
  text-align: center;
}
.outcome {
  margin-top: 2rem;
}
</style>
