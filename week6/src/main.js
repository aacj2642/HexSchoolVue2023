import { createApp } from "vue";
import { createPinia } from "pinia";
import Loading from "vue-loading-overlay";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import "./assets/all.scss";

// bootstrap js 全局使用
import "bootstrap";

import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

import { localize, setLocale } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";

configure({
  generateMessage: localize({ zh_TW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale("zh_TW");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.component("VueLoading", Loading);
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
