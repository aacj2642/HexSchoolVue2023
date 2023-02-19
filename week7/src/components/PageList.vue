<template>
  <nav aria-label="Page navigation example" v-if="pagination.total_pages">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled ': nowPageInt === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(-1)">&lt;</a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page">
        <a
          class="page-link"
          :class="{ active: nowPageInt === page }"
          href="#"
          @click.prevent="goToPage(page)"
          >{{ page }}</a
        >
      </li>
      <li
        class="page-item"
        :class="{ 'disabled ': nowPageInt === pagination.total_pages }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(1)">&gt;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PageList",
  props: ["pagination", "nowPage", "nowView"],
  methods: {
    goToPage(page) {
      const url = `${this.nowView}/${page}`;
      this.$router.push(url);
    },
    changePage(changeVal) {
      this.$router.push(`${this.nowView}/${this.nowPageInt + changeVal}`);
    },
  },
  computed: {
    nowPageInt() {
      return parseInt(this.nowPage);
    },
  },
};
</script>
