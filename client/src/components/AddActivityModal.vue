<script setup lang="ts">
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { reactive } from "vue";
import { useActivityStore, type Activity } from "@/stores/activity.store";

const props = defineProps({
  visible: {type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'hide'])

const state: Partial<Activity> = reactive({
    title: '',
    value: 0,
    duration: 0,
});

const activityStore = useActivityStore();

function handleClick() {
    emit('confirm', state);

    state.title    = '';
    state.value    = 0;
    state.duration = 0;
}

</script>

<template>
    <Dialog header="Describe activity" v-model:visible="visible" :modal="true" @hide="emit('hide')">
        <div class="input-fields">
            <div class="field">
                <label for="activity-title">Title</label>
                <InputText id="activity-title" type="text" v-model="state.title" placeholder="Yoga" />
            </div>
            <div class="field">
                <label for="activity-value">Value</label>
                <InputNumber id="activity-value" v-model="state.value" mode="decimal" :useGrouping="false" :min="0" />
            </div>
            <div class="field">
                <label for="activity-duration">Duration</label>
                <InputNumber
                    id="activity-duration"
                    v-model="state.duration"
                    mode="decimal"
                    :useGrouping="false"
                    :minFractionDigits="1"
                    :maxFractionDigits="3"
                    :min="0"
                />
            </div>

            <Button
                label="Confirm"
                icon="pi pi-plus"
                class="button p-button-success p-button p-button-sm"
                @click="handleClick"
            />
        </div>
    </Dialog>
</template>

<style scoped>
.input-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.button {
    margin-top: 15px;
}

.field>label {
    display: block;
}
</style>