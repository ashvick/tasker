<script setup lang="ts">
import type { Activity } from '@/stores/activity.store';
import { useActivityModalStore } from '@/stores/activityModal.store';
import { computed } from '@vue/reactivity';
import Card from "primevue/card";

export interface Props {
  activity: Activity
  showDate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDate: false,
});

const emit = defineEmits(['delete'])

const cornerColor = computed(() => {
  return props.activity.useful ? '#689F38' : '#D32F2F'
})

function showActivityModal() {
  const modalStore = useActivityModalStore();

  modalStore.edit = true;
  modalStore.activityData = props.activity;
  modalStore.display = true;
}
</script>

<template>
  <Card class="card">
    <template #title>
      <div class="title">
        <span>{{ activity.title }}</span>
        <div>
          <i class="pencil-icon pi pi-pencil" @click="showActivityModal"></i>
          <i class="trash-icon pi pi-trash" @click="emit('delete', activity._id)"></i>
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

<style scoped>
  .card {
    width: 20rem;
    margin-bottom: 1em;
    background: linear-gradient(320deg, v-bind(cornerColor) 5%, #fff 5.3%);
  }
  .title {
    display: flex;
    justify-content: space-between;
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
