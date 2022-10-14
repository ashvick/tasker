import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { defineStore } from "pinia";

export interface Activity {
  _id?: string;
  title: string;
  value: number;
  duration: number;
  useful: boolean;
  date: Date;
}

export const useActivityStore = defineStore("activities", {
  state: () => ({
    date: new Date(Date.now()),
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
      const usefulPoints = this.usefulActivities.reduce(
        (sum: number, activity: Activity) =>
          sum + activity.value * activity.duration,
        0
      );
      const uselessPoints = this.uselessActivities.reduce(
        (sum: number, activity: Activity) =>
          sum + activity.value * activity.duration,
        0
      );

      return usefulPoints - uselessPoints;
    },
  },
  actions: {
    async getAllActivities() {
      const activities = await fetchWrapper.get("api/activities/");
      this.activities = activities.map((activity: Activity) => {
        activity.date = new Date(activity.date);
        return activity;
      });
    },

    async getActivities(date: Date) {
      const [dateISO] = date.toISOString().split("T");
      const activities = await fetchWrapper.get("api/activities/" + dateISO);
      this.activities = activities.map((activity: Activity) => {
        activity.date = new Date(activity.date);
        return activity;
      });
    },

    async addActivity(activity: Partial<Activity>) {
      const addedActivity = await fetchWrapper.post(
        "api/activities/add",
        activity
      );
      addedActivity.date = new Date(addedActivity.date);
      this.activities.push(addedActivity);
    },

    async updateActivity(activity: Partial<Activity>) {
      await fetchWrapper.post(
        "api/activities/update/" + activity._id,
        activity
      );
    },

    async deleteActivity(id: string) {
      fetchWrapper
        .delete("api/activities/" + id)
        .then(() => {
          this.activities = this.activities.filter((activity) => {
            return activity._id !== id;
          });
        })
        .catch((err) => alert(err));
    },
  },
});
