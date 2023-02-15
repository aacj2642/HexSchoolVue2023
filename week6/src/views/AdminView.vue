<template>
  <div>
    <h2 class="text-center">後台頁面</h2>
    <header class="mb-2">
      <nav class="d-flex justify-content-center">
        <RouterLink to="/">前台首頁</RouterLink> |
        <RouterLink to="/">登出</RouterLink> |
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "AdminView",
  components: { RouterLink, RouterView },
};
</script>
<style></style>
