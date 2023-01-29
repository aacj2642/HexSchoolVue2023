export default {
  name: "PageList",
  template: `
      <nav
        aria-label="Page navigation example"
        v-if="pagination.total_pages"
      >
        <ul class="pagination">
          <li class="page-item" :class="{'disabled ': nowPage===1}">
            <a class="page-link" href="#" @click="changePage(-1)">&lt;</a>
          </li>
          <li
            class="page-item"
            v-for="page in pagination.total_pages"
            :key="page"
          >
            <a
              class="page-link"
              :class="{active: nowPage===page}"
              :href="'?p=' + page"
              >{{page}}</a
            >
          </li>
          <li
            class="page-item"
            :class="{'disabled ': nowPage===pagination.total_pages}"
          >
            <a class="page-link" href="#" @click="changePage(1)">&gt;</a>
          </li>
        </ul>
      </nav>
      `,
  props: ["pagination", "nowPage"],
  methods: {
    changePage(changeVal) {
      window.location.href = `?p=${this.nowPage + changeVal}`;
    },
  },
};
