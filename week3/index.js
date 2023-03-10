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
    showCreateProduct() {
      this.isCreatingProduct = true;
      this.productModal.show();
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
      this.productModal.show();
      this.tempImg = "";
      this.tempProduct = JSON.parse(JSON.stringify(product));
    },
    addImg() {
      if (!Array.isArray(this.tempProduct.imagesUrl)) {
        this.tempProduct.imagesUrl = [];
      }
      this.tempProduct.imagesUrl.push(this.tempImg);
      this.tempImg = "";
    },
    removeImg() {
      const removeImgIndex = this.tempProduct.imagesUrl.indexOf(this.tempImg);
      if (removeImgIndex != -1) {
        this.tempProduct.imagesUrl.splice(removeImgIndex, 1);
      }
    },
    setProduct() {
      if (this.tempProduct.id === undefined) {
        this.createdProduct();
      } else {
        this.editProduct();
      }
    },
    createdProduct() {
      const url = `${this.baseApiUrl}${this.operationProductsUrl}`;
      axios
        .post(url, { data: this.tempProduct })
        .then((res) => {
          alert(`新增 ${this.tempProduct.title} 成功`);
          this.tempProduct = {};
          this.getProducts();
          this.productModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    editProduct() {
      const url = `${this.baseApiUrl}${this.operationProductsUrl}/${this.tempProduct.id}`;
      axios
        .put(url, { data: this.tempProduct })
        .then((res) => {
          alert(`修改 ${this.tempProduct.title} 成功`);
          this.getProducts();
          this.productModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.loading = false;
        });
    },
    setDeleteProduct(product) {
      this.wantDeleteProduct = product;
      this.delProductModal.show();
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
          alert(err.response.data.message);
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
