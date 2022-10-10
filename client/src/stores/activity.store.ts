import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { defineStore } from "pinia";

export interface Activity {
    _id: string;
    title: string;
    value: number;
    duration: number;
    useful: boolean;
    date: Date;
}

export const useActivityStore = defineStore("activities", {
    state: () => ({
        activities: [] as Activity[],
    }),
    getters: {
        usefulActivities(state): Activity[] {
            return state.activities.filter((activity) => activity.useful);
        },

        uselessActivities(state): Activity[] {
            return state.activities.filter((activity) => !activity.useful);
        },

        outcome(): number {
            const usefulPoints = this.usefulActivities.reduce((sum: number, activity: Activity) => sum + activity.value * activity.duration, 0);
            const uselessPoints = this.uselessActivities.reduce((sum: number, activity: Activity) => sum + activity.value * activity.duration, 0);

            return usefulPoints - uselessPoints;
        }
    },
    actions: {
        async getActivities(date: Date) {
            const [dateISO] = date.toISOString().split('T');
            const activities = await fetchWrapper.get('api/activities/' + dateISO);
            this.activities = activities;
        },

        async addActivity(inputData: any) {
            console.log(inputData);

            const addedActivity = await fetchWrapper.post('api/activities/add', inputData);
            this.activities.push(addedActivity);
        },

        async deleteActivity(id: string) {
            fetchWrapper.delete('api/activities/' + id)
                .then(() => {
                    this.activities = this.activities.filter(( activity ) => {
                        return activity._id !== id;
                    });
                })
                .catch(err => alert(err));
        },
    },
});
