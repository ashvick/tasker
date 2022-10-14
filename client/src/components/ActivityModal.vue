<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import { useActivityStore, type Activity } from "@/stores/activity.store";
import { useActivityModalStore } from "@/stores/activityModal.store";

defineEmits(["activityWasUpdated"]);

const activityStore = useActivityStore();
const modalStore = useActivityModalStore();

function handleConfirm() {
  const activity: Partial<Activity> = {
    _id: modalStore.activityData._id ?? "",
    title: modalStore.activityData.title ?? "",
    value: modalStore.activityData.value ?? 0,
    duration: modalStore.activityData.duration ?? 0,
    useful: modalStore.activityData.useful,
    date: modalStore.activityData.date ?? new Date(),
  };

  if (modalStore.edit) {
    activityStore
      .updateActivity(activity)
      .then(() => activityStore.getActivities(activityStore.date))
      .catch((error) => alert(error));
  } else {
    activityStore.addActivity(activity).catch((error) => alert(error));
  }

  modalStore.resetActivityData();
  modalStore.display = false;
}

function dateSelect(date: Date) {
  modalStore.activityData.date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}
</script>

<template>
  <Dialog
    header="Describe activity"
    v-model:visible="modalStore.display"
    :modal="true"
    :breakpoints="{ '576px': '80vw' }"
    :style="{ width: '400px' }"
  >
    <div class="input-fields">
      <div class="field">
        <label for="activity-title">Title</label>
        <InputText
          id="activity-title"
          type="text"
          v-model="modalStore.activityData.title"
          placeholder="Yoga"
          :style="{ width: '100%' }"
        />
      </div>
      <div class="field">
        <label for="activity-value">Value</label>
        <InputNumber
          id="activity-value"
          v-model="modalStore.activityData.value"
          mode="decimal"
          :use-grouping="false"
          :min="0"
          :style="{ width: '100%' }"
        />
      </div>
      <div class="field">
        <label for="activity-duration">Duration</label>
        <InputNumber
          id="activity-duration"
          v-model="modalStore.activityData.duration"
          mode="decimal"
          :use-grouping="false"
          :min-fraction-digits="1"
          :max-fraction-digits="3"
          :min="0"
          :style="{ width: '100%' }"
        />
      </div>
      <div v-if="modalStore.edit" class="field">
        <label for="activity-date">Date</label>
        <Calendar
          date-format="dd-mm-yy"
          :model-value="modalStore.activityData.date"
          @date-select="dateSelect"
        />
      </div>

      <Button
        label="Confirm"
        icon="pi pi-plus"
        class="button p-button-success p-button p-button-sm"
        @click="handleConfirm"
      />
    </div>
  </Dialog>
</template>

<style>
.input-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button {
  margin-top: 15px;
}

.field > label {
  display: block;
}
</style>
