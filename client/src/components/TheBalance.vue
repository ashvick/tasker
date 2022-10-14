<script setup lang="ts">
import { ref } from "vue";
import ActivityColumn from "./ActivityColumn.vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import TheOutcome from "./TheOutcome.vue";
import AddActivityModal from "./ActivityModal.vue";
import OverlayPanel from "primevue/overlaypanel";
import Listbox from "primevue/listbox";
import { useActivityStore } from "@/stores/activity.store";
import { useActivityModalStore } from "@/stores/activityModal.store";

const activityStore = useActivityStore();
const modalStore = useActivityModalStore();
const selectedActivity = ref();
const isAddUseful = ref();
const op = ref();

activityStore.getActivities(activityStore.date);

function dateSelect(date: Date) {
  const dateUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  activityStore.date = dateUTC;
  activityStore.getActivities(dateUTC);
}

function clickHandler(event: any, useful: boolean) {
  isAddUseful.value = useful;
  op.value.toggle(event);
}

function createClickHandler() {
  modalStore.edit = false;
  modalStore.activityData = {
    date: activityStore.date,
    useful: isAddUseful.value,
  };
  modalStore.display = true;
}
</script>

<template>
  <div class="balance">
    <AddActivityModal />
    <OverlayPanel ref="op">
      <Listbox
        v-model="selectedActivity"
        option-label="title"
        :options="activityStore.usefulActivities"
      />
      <Button
        label="Create new"
        icon="pi pi-plus"
        class="p-button-success p-button-outlined p-button-sm"
        @click="createClickHandler"
      />
    </OverlayPanel>
    <div class="column-wrapper">
      <ActivityColumn
        header="Useful activities"
        :activities="activityStore.usefulActivities"
      />
      <Button
        label="Add"
        icon="pi pi-plus"
        class="button p-button-success p-button-outlined p-button-sm"
        @click="clickHandler($event, true)"
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
    <div class="column-wrapper">
      <ActivityColumn
        header="Useless activities"
        :activities="activityStore.uselessActivities"
      />
      <Button
        style="margin-left: auto"
        label="Add"
        icon="pi pi-plus"
        class="button p-button-danger p-button-outlined p-button-sm"
        @click="clickHandler($event, false)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.balance {
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0.5em;
  }
}
.column-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 20rem;
  @media screen and (max-width: 768px) {
    flex-basis: 48%;
  }
}
.balance-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-width: 10rem;
  @media screen and (max-width: 768px) {
    flex-basis: 100%;
    order: -1;
  }
}
.button {
  width: 5rem;
}
</style>
