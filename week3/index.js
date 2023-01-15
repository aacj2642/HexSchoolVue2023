// 產品資料格式
const { createApp } = Vue;
createApp({
  data() {
    return {
      baseApiUrl: "https://vue3-course-api.hexschool.io/v2/",
      checkUrl: "api/user/check",
      getProductsUrl: "api/weiyang/admin/products/all",
      operationProductsUrl: "api/weiyang/admin/product",
      loading: false,
      products: [],
      tempProduct: {},
      isCreatingProduct: true,
      wantDeleteProduct: {},
      productModal: {},
      delProductModal: {},
      tempImg: "",
    };
  },
  methods: {
    checkAuth() {
      let token = "";
      token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token.length != 0) {
        axios.defaults.headers.common["Authorization"] = token;
        this.checkToken();
      } else {
        window.location = "./login.html";
      }
    },
    checkToken() {
      this.loading = true;
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
      this.loading = true;
      axios
        .get(`${this.baseApiUrl}${this.getProductsUrl}`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.message);
        })
        .then((res) => {
          this.loading = false;
        });
    },
    showCreateProduct() {
      this.isCreatingProduct = true;
      // 裡面有之前編輯到一半的資料，而且不是 Edit 的內容
      const haveTempData =
        JSON.stringify(this.tempProduct) != "{}" &&
        this.tempProduct.id === undefined;
      if (!haveTempData) {
        this.tempProduct = {};
        this.tempImg = "";
      }
    },
    showEditProduct(product) {
      this.isCreatingProduct = false;
      this.tempImg = "";
      this.tempProduct = JSON.parse(JSON.stringify(product));
    },
    addImg() {
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = [];
      }
      this.tempProduct.imagesUrl.push(this.tempImg);
    },
    removeImg() {
      const removeImgIndex = this.tempProduct.imagesUrl.indexOf(this.tempImg);
      if (removeImgIndex != -1) {
        this.tempProduct.imagesUrl.splice(removeImgIndex, 1);
      }
    },
    setProduct() {
      this.loading = true;
      let url;
      if (this.tempProduct.id === undefined) {
        url = `${this.baseApiUrl}${this.operationProductsUrl}`;
        axios
          .post(url, { data: this.tempProduct })
          .then((res) => {
            alert(`新增 ${this.tempProduct.title} 成功`);
            this.getProducts();
            this.productModal.hide();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        url = `${this.baseApiUrl}${this.operationProductsUrl}/${this.tempProduct.id}`;
        axios
          .put(url, { data: this.tempProduct })
          .then((res) => {
            alert(`修改 ${this.tempProduct.title} 成功`);
            this.getProducts();
            this.productModal.hide();
          })
          .catch((err) => {
            console.log(err.message);
            this.loading = false;
          });
      }
    },
    setDeleteProduct(product) {
      this.wantDeleteProduct = product;
    },
    deleteProduct() {
      this.loading = true;
      const url = `${this.baseApiUrl}${this.operationProductsUrl}/${this.wantDeleteProduct.id}`;
      axios
        .delete(url)
        .then((res) => {
          alert(`刪除 ${this.wantDeleteProduct.title} 成功`);
          this.getProducts();
          this.delProductModal.hide();
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  computed: {
    haveSameImg() {
      return this.tempProduct.imagesUrl?.includes(this.tempImg);
    },
  },
  mounted() {
    this.checkAuth();
    this.productModal = new bootstrap.Modal(
      document.getElementById("productModal")
    );
    this.delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
  },
}).mount("#app");
