<script setup lang="ts">
import ActivityColumn from "./ActivityColumn.vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import TheOutcome from "./TheOutcome.vue";
import AddActivityModal from "./ActivityModal.vue";
import { useActivityStore } from "@/stores/activity.store";
import { useActivityModalStore } from "@/stores/activityModal.store";

const activityStore = useActivityStore();
const modalStore = useActivityModalStore();

activityStore.getActivities(activityStore.date);

function dateSelect(date: Date) {
  const dateUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  activityStore.date = dateUTC;
  activityStore.getActivities(dateUTC);
}

function clickHandler(useful: boolean) {
  modalStore.edit = false;
  modalStore.activityData = {
    date: activityStore.date,
    useful: useful,
  };
  modalStore.display = true;
}
</script>

<template>
  <div class="balance">
    <div class="column-useful">
      <ActivityColumn
        header="Useful activities"
        :activities="activityStore.usefulActivities"
      />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="p-button-success p-button-outlined p-button-sm"
        @click="clickHandler(true)"
      />
    </div>
    <div class="balance-container">
      <Calendar
        date-format="dd-mm-yy"
        :model-value="activityStore.date"
        @date-select="dateSelect"
      />
      <TheOutcome class="outcome" :value="activityStore.outcome" />
    </div>
    <div class="column-useless">
      <ActivityColumn
        header="Useless activities"
        :activities="activityStore.uselessActivities"
      />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="p-button-danger p-button-outlined p-button-sm"
        @click="clickHandler(false)"
      />
    </div>
    <AddActivityModal />
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
.outcome {
  margin-top: 2rem;
}
</style>
