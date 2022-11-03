<script setup lang="ts">
import type { Activity } from "@/stores/activity.store";
import { useActivityModalStore } from "@/stores/activityModal.store";
import { ref, computed } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";

interface Props {
  activity: Activity;
  showDate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showDate: false,
});

const emit = defineEmits(["delete"]);

const op = ref();

const cornerColor = computed(() => {
  return props.activity.useful ? "#689F38" : "#D32F2F";
});

function showActivityModal() {
  const modalStore = useActivityModalStore();

  modalStore.edit = true;
  modalStore.activityData = props.activity;
  modalStore.display = true;
}

function toggleOverlay(event: any) {
  op.value.toggle(event);
}
</script>

<template>
  <Card class="card">
    <template #title>
      <div class="title">
        <span class="activity-name">{{ activity.title }}</span>
        <i class="ellipsis-icon pi pi-ellipsis-v" @click="toggleOverlay"></i>
        <OverlayPanel ref="op">
          <Button
            label="Edit"
            icon="pi pi-plus"
            class="p-button-success p-button-outlined p-button-sm"
            @click="alert"
          />
          <Button
            label="Delete"
            icon="pi pi-plus"
            class="p-button-success p-button-outlined p-button-sm"
            @click="alert"
          />
        </OverlayPanel>
        <div ref="icons" class="icons">
          <i class="pencil-icon pi pi-pencil" @click="showActivityModal"></i>
          <i
            class="trash-icon pi pi-trash"
            @click="emit('delete', activity._id)"
          ></i>
        </div>
      </div>
    </template>
    <template #content>
      <div class="content">
        <p>Value per hour: {{ activity.value }}</p>
        <p>Duration: {{ activity.duration }}</p>
        <p v-if="showDate">Date: {{ activity.date.toLocaleDateString() }}</p>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
:deep(.p-card-content) {
  padding: 0;
}

@media screen and (max-width: 768px) {
  :deep(.p-card-body) {
    padding: 0.5rem;
  }
}

.card {
  max-width: 20rem;
  margin-bottom: 1em;
  background: linear-gradient(320deg, v-bind(cornerColor) 5%, #fff 5.3%);
  @media screen and (max-width: 768px) {
    font-size: 1em;
  }
}

.title {
  display: flex;
  justify-content: space-between;
}

.activity-name {
  padding-right: 0.5rem;
  font-size: 1.3rem;
  @media screen and (max-width: 768px) {
    font-size: 0.7em;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media screen and (max-width: 576px) {
    max-width: 9rem;
  }
}

.icons {
  display: inline-block;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
}

.ellipsis-icon {
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
}

.trash-icon {
  cursor: pointer;
}

.pencil-icon {
  margin-right: 0.7rem;
  cursor: pointer;
}

.content {
  display: block;
}
</style>
