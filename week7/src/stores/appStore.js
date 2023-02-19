import { defineStore } from "pinia";

export default defineStore("appStore", {
  state: () => ({
    loading: 0,
    isLogin: false,
  }),
  actions: {
    setIsLogin(result) {
      this.isLogin = result;
    },
    setLoading(count) {
      this.loading += count;
    },
  },
});
