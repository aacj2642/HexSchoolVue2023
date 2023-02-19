<template>
  <div>
    <h2 class="text-center">後台頁面</h2>
    <header class="mb-2">
      <nav class="d-flex justify-content-center">
        <RouterLink class="px-3" to="/">前台首頁</RouterLink> |
        <RouterLink class="px-3" to="/admin/products">管理產品</RouterLink> |
        <RouterLink class="px-3" to="/admin/orders">管理訂單</RouterLink> |
        <a v-if="isLogin" class="px-3" href="#" @click.prevent="logout">登出</a>
        <RouterLink v-else class="px-3" to="/admin/login">登入</RouterLink>
        |
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { mapState } from "pinia";
import appStore from "../stores/appStore.js";
export default {
  name: "AdminView",
  components: { RouterLink, RouterView },
  methods: {
    logout() {
      document.cookie = `token=;`;
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(appStore, ["isLogin"]),
  },
};
</script>
<style></style>
