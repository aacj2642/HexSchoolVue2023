// 產品資料格式
const { createApp } = Vue;
createApp({
  data() {
    return {
      baseApiUrl: "https://vue3-course-api.hexschool.io/v2/",
      checkUrl: "api/user/check",
      getProductsUrl: "api/weiyang/admin/products/all",
      loading: false,
      products: [],
      nowProduct: {},
    };
  },
  methods: {
    viewProduct(product) {
      this.nowProduct = product;
    },
    checkAuth() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token.length != 0) {
        axios.defaults.headers.common["Authorization"] = token;
        this.checkToken();
      } else {
        alert("尚未登入");
        window.location = "./login.html";
      }
    },
    checkToken() {
      this.loading = true;
      axios
        .post(`${this.baseApiUrl}${this.checkUrl}`)
        .then((res) => {
          if (!res.data.success) {
            alert("尚未登入");
            window.location = "./login.html";
          } else {
            this.getProducts();
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "./login.html";
        });
    },
    getProducts() {
      this.loading = true;
      axios
        .get(`${this.baseApiUrl}${this.getProductsUrl}`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then((res) => {
          this.loading = false;
        });
    },
  },
  computed: {
    productsAmount() {
      return Object.keys(this.products).length;
    },
  },
  mounted() {
    this.checkAuth();
  },
}).mount("#app");
