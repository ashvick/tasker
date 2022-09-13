import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Card from "primevue/card";
import Badge from "primevue/badge";

const app = createApp(App);

app.use(PrimeVue);
app.component('Card', Card);
app.component('Badge', Badge);

app.use(createPinia());
app.use(router);

app.mount("#app");
