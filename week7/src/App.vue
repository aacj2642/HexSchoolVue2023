<template>
  <VueLoading v-model:active="isLoading"></VueLoading>
  <div class="container">
    <h1 class="text-center">第六周作業</h1>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { mapState } from "pinia";
import appStore from "./stores/appStore.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    RouterView,
    VueLoading: Loading,
  },
  computed: {
    ...mapState(appStore, ["loading"]),
    isLoading() {
      return this.loading > 0;
    },
  },
};
</script>
