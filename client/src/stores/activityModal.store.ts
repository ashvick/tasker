import { defineStore } from "pinia";
import type { Activity } from "./activity.store";

export const useActivityModalStore = defineStore("activityModal", {
    state: () => ({
        display: false,
        edit: false,
        activityData: {} as Partial<Activity>,
        options: {},
    }),
    actions: {
        async resetActivityData() {
            this.activityData = {}
        },
    }
});