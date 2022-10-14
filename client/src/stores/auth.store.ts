import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user") ?? "null"),
    returnUrl: null as string | null,
  }),
  actions: {
    async register(username: string, email: string, password: string) {
      await fetchWrapper.post("/api/auth/register", {
        username,
        email,
        password,
      });
    },

    async login(username: string, password: string) {
      const user = await fetchWrapper.post("/api/auth/login", {
        username,
        password,
      });

      // update pinia state
      this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/balance");
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
