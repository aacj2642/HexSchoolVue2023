import {
  PageList,
  ProductEditor,
  DeleteProduct,
  UploadImage,
} from "./components.js";

const { createApp } = Vue;
createApp({
  components: {
    PageList,
    ProductEditor,
    DeleteProduct,
    UploadImage,
  },
  data() {
    return {
      baseApiUrl: "https://vue3-course-api.hexschool.io/v2/api/",
      checkUrl: "user/check",
      getProductsUrl: "weiyang/admin/products",
      operationProductsUrl: "weiyang/admin/product",
      uploadImageUrl: "weiyang/admin/upload",
      pagination: {},
      loading: false,
      nowPage: 1,
      products: [],
      tempProduct: {},
      tempImg: "",
      tempUploadImg: "",
      isCreatingProduct: true,
      wantDeleteProduct: {},
      productModal: {},
      delProductModal: {},
      uploadModal: {},
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
    checkPage() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.nowPage = parseInt(urlParams.get("p") ?? 1);
    },
    getProducts() {
      this.loading = true;
      axios
        .get(`${this.baseApiUrl}${this.getProductsUrl}`, {
          params: { page: this.nowPage },
        })
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
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
    setProduct() {
      this.loading = true;
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
    returnEdit() {
      this.productModal.show();
      document.querySelector("[name=file-to-upload]").value = "";
    },
    checkImg(fileInput) {
      const curFile = fileInput.target.files[0];
      if (curFile) {
        const reader = new FileReader();
        // 這會在readAS後才執行
        reader.onload = (e) => {
          // console.log('file:', e.target.result); // base64
          this.tempUploadImg = e.target.result;
        };

        // to data url
        reader.readAsDataURL(curFile);
      }
    },
    uploadImg() {
      this.loading = true;
      const file = document.querySelector("[name=file-to-upload]").files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      axios
        .post(`${this.baseApiUrl}${this.uploadImageUrl}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            alert("上傳成功");
            this.tempImg = res.data.imageUrl;
            this.tempProduct.imagesUrl.unshift(this.tempImg);
            this.returnEdit();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then((res) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.checkAuth();
    this.checkPage();
    this.productModal = new bootstrap.Modal(
      document.getElementById("productModal")
    );
    this.delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
    this.uploadModal = new bootstrap.Modal(
      document.getElementById("uploadModal")
    );

    document
      .getElementById("uploadModal")
      .addEventListener("hidden.bs.modal", (event) => {
        this.tempUploadImg = "";
        this.returnEdit();
      });
  },
}).mount("#app");
