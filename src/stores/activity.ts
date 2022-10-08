import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export class Activity {
    id: string;
    title: string;
    value: number;
    duration: number = 0;
    useful: boolean;

    constructor(title: string, value: number, duration: number, useful: boolean) {
        this.id = uuidv4();
        this.title = title;
        this.value = value;
        this.duration = duration;
        this.useful = useful;
    }
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
        // fetchPredefinedActivities() {
        //     this.activities.push(new Activity('Programming', 2, 0, ));
        // },

        addActivity(activity: Activity) {
            this.activities.push(activity);
        },

        deleteActivity(id: string) {
            this.activities = this.activities.filter(( activity ) => {
                return activity.id !== id;
            });
        },
    },
});
