<template>
  <div class="container">
    <h1 class="text-center">第六周作業</h1>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "App",
  data() {
    return {};
  },
  components: { RouterLink, RouterView },
};
</script>
