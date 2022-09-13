<script setup lang="ts">
import TheTask from "./TheTask.vue";
import Button from "primevue/button";
</script>

<template>
  <div class="column">
    <div class="tasks">
      <TheTask title="exercise" value="5" />
      <TheTask title="job" value="3" />
      <TheTask title="programming" value="3" />
    </div>
    <div class="buttons">
      <Button
        icon="pi pi-plus"
        class="p-button-rounded p-button-success p-button-outlined"
      />
      <Button
        icon="pi pi-minus"
        class="p-button-rounded p-button-success p-button-outlined"
      />
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.buttons {
  display: flex;
  gap: 14px;
  justify-content: end;
}
</style>
