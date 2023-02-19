<template>
  <div>
    <h2 class="text-center">前台頁面</h2>
    <header class="mb-2">
      <nav class="d-flex justify-content-center">
        <RouterLink class="px-3" to="/">首頁</RouterLink> |
        <RouterLink class="px-3" to="/products">產品列表</RouterLink> |
        <RouterLink class="px-3" to="/cart">購物車</RouterLink> |
        <RouterLink class="px-3" to="/admin/login">切換後台</RouterLink> |
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
