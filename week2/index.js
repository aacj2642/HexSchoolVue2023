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
      this.loading = true;
      let token = "";
      token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token.length != 0) {
        axios.defaults.headers.common["Authorization"] = token;
        this.checkToken();
        this.loading = false;
      } else {
        window.location = "./login.html";
      }
    },
    checkToken() {
      axios
        .post(`${this.baseApiUrl}${this.checkUrl}`)
        .then((res) => {
          if (!res.data.success) {
            window.location = "./login.html";
          } else {
            this.getProducts();
          }
        })
        .catch((err) => {
          console.log(err.message);
          window.location = "./login.html";
        });
    },
    getProducts() {
      axios
        .get(`${this.baseApiUrl}${this.getProductsUrl}`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.message);
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