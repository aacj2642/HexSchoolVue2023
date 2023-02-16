import { defineStore } from "pinia";

export default defineStore("appStore", {
  state: () => ({
    loading: 0,
  }),
  actions: {
    setLoading(count) {
      this.loading += count;
    },
  },
});
