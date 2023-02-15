<template>
  <div>
    <h2 class="text-center">前台頁面</h2>
    <header class="mb-2">
      <nav class="d-flex justify-content-center">
        <RouterLink to="/">前台首頁</RouterLink> |
        <RouterLink to="/admin/login">登入</RouterLink> |
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  name: "IndexView",
  components: { RouterLink, RouterView },
};
</script>

<style scoped></style>
