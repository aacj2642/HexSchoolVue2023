import { createApp } from "vue";
import { createPinia } from "pinia";
import Loading from "vue-loading-overlay";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import "./assets/all.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.component("VueLoading", Loading);

app.mount("#app");
