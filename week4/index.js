const PageList = {
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
          :class="{'active': nowPage===page}"
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
  props: ["pagination", "nowPage", "changePage"],
};
const ProductEditor = {
  name: "ProductEditor",
  template: `
    <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-text="isCreatingProduct ? '新增' : '編輯'"></span>
            <span>產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-1">
                  <label for="imageUrl" class="form-label">
                    輸入圖片網址
                  </label>
                  <input
                    type="text"
                    v-model="tempImg"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img
                  v-if="tempImg.length > 0"
                  class="img-fluid"
                  :src="tempImg"
                  alt="temp image"
                />
              </div>
              <div>
                <button
                  v-if="!haveSameImg"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  type="button"
                  @click="addImg"
                >
                  新增圖片
                </button>
              </div>
              <div>
                <button
                  v-if="haveSameImg"
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  type="button"
                  @click="removeImg"
                >
                  刪除圖片
                </button>
              </div>
              <template v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="form-label">商品圖片</div>
                <img
                  v-for="(image, key) in tempProduct.imagesUrl"
                  :key="image"
                  @click="tempImg = image"
                  class="img-fluid"
                  :src="image"
                  alt="'product image ' + key"
                />
              </template>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label"
                    >原價</label
                  >
                  <input
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label"
                  >產品描述</label
                >
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="setProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      tempImg: "",
    };
  },
  props: ["isCreatingProduct", "tempProduct", "setProduct"],
  methods: {
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
  },
  computed: {
    haveSameImg() {
      return this.tempProduct.imagesUrl?.includes(this.tempImg);
    },
  },
};
const DeleteProduct = {
  name: "DeleteProduct",
  template: `
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">
            {{ wantDeleteProduct.title }}
          </strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
        `,
  props: ["wantDeleteProduct", "deleteProduct"],
};

const { createApp } = Vue;
createApp({
  components: {
    PageList,
    ProductEditor,
    DeleteProduct
  },
  data() {
    return {
      baseApiUrl: "https://vue3-course-api.hexschool.io/v2/",
      checkUrl: "api/user/check",
      pagination: {},
      getProductsUrl: "api/weiyang/admin/products",
      operationProductsUrl: "api/weiyang/admin/product",
      loading: false,
      nowPage: 1,
      products: [],
      tempProduct: {},
      isCreatingProduct: true,
      wantDeleteProduct: {},
      productModal: {},
      delProductModal: {},
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
    changePage(changeVal) {
      window.location.href = `?p=${this.nowPage + changeVal}`;
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
  },
}).mount("#app");
