<template>
  <div class="container">
    <div class="mt-4 d-flex justify-content-between align-items-end">
      <span>⭐為店家推薦</span>
      <button class="btn btn-primary" @click="showCreateProduct">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, id) in products" :key="id">
          <td>{{ product.category }}</td>
          <td><span v-if="product.recommend">⭐</span> {{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span
              class="text-success"
              v-text="product.is_enabled ? '啟用' : '未啟用'"
            ></span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="showEditProduct(product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="setDeleteProduct(product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PageList
      :pagination="pagination"
      :nowPage="nowPage"
      nowView="/admin/products"
    ></PageList>
  </div>
  <!-- Modal -->
  <ProductEditor
    :isCreating-product="isCreatingProduct"
    :product="tempProduct"
    :setProduct="setProduct"
    v-model:tempImg="tempImg"
    :productModal="productModal"
    :uploadModal="uploadModal"
  ></ProductEditor>

  <DeleteProduct
    :wantDeleteProduct="wantDeleteProduct"
    :deleteProduct="deleteProduct"
  ></DeleteProduct>

  <UploadImage
    :uploadImg="uploadImg"
    :temp-uploadImg="tempUploadImg"
    :checkImg="checkImg"
  ></UploadImage>
  <!-- Modal -->
</template>

<script>
import PageList from "../../components/PageList.vue";
import ProductEditor from "../../components/ProductEditor.vue";
import DeleteProduct from "../../components/DeleteProduct.vue";
import UploadImage from "../../components/UploadImage.vue";
import { mapActions } from "pinia";
import appStore from "../../stores/appStore.js";
import { Modal } from "bootstrap";

import {
  checkUrl,
  getProductsUrl,
  operationProductsUrl,
  uploadImageUrl,
} from "../../apiPath.js";

export default {
  components: {
    PageList,
    ProductEditor,
    DeleteProduct,
    UploadImage,
  },
  data() {
    return {
      pagination: {},
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
  props: ["nowPage"],
  methods: {
    ...mapActions(appStore, ["setLoading", "setIsLogin"]),
    checkAuth() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token.length != 0) {
        this.$http.defaults.headers.common["Authorization"] = token;
        this.setLoading(1);
        this.$http
          .post(checkUrl)
          .then((res) => {
            if (!res.data.success) {
              alert("尚未登入");
              this.$router.push("/admin/login");
            } else {
              this.setIsLogin(true);
              this.getProducts();
            }
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/admin/login");
          })
          .then(() => {
            this.setLoading(-1);
          });
      } else {
        alert("尚未登入");
        this.$router.push("/admin/login");
      }
    },
    isPositiveInteger(str) {
      // 檢查字串是否為空或 null
      if (str == null || str === "") {
        return false;
      }

      // 使用正則表達式檢查是否只包含數字
      const regex = /^[0-9]+$/;
      if (!regex.test(str)) {
        return false;
      }

      // 將字串轉換為數字，檢查是否為正整數
      const num = parseInt(str);
      if (num <= 0) {
        return false;
      }

      return true;
    },
    getProducts() {
      // 檢查是不是正整數
      if (!this.isPositiveInteger(this.nowPage)) {
        this.$router.push(`/admin/products/1`);
        return false;
      }
      this.setLoading(1);
      this.$http
        .get(getProductsUrl, {
          params: { page: this.nowPage },
        })
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          if (this.pagination.total_pages < parseInt(this.nowPage)) {
            this.$router.push(`/admin/products/${this.pagination.total_pages}`);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
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
      this.tempProduct.imageUrl = this.tempProduct.imagesUrl[0];
      if (this.tempProduct.id === undefined) {
        this.createdProduct();
      } else {
        this.editProduct();
      }
    },
    createdProduct() {
      this.setLoading(1);
      const url = operationProductsUrl;
      this.$http
        .post(url, { data: this.tempProduct })
        .then(() => {
          alert(`新增 ${this.tempProduct.title} 成功`);
          this.tempProduct = {};
          this.getProducts();
          this.productModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    editProduct() {
      this.setLoading(1);
      const url = `${operationProductsUrl}/${this.tempProduct.id}`;
      this.$http
        .put(url, { data: this.tempProduct })
        .then(() => {
          alert(`修改 ${this.tempProduct.title} 成功`);
          this.getProducts();
          this.productModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    setDeleteProduct(product) {
      this.wantDeleteProduct = product;
      this.delProductModal.show();
    },
    deleteProduct() {
      this.setLoading(1);
      const url = `${operationProductsUrl}/${this.wantDeleteProduct.id}`;
      this.$http
        .delete(url)
        .then(() => {
          alert(`刪除 ${this.wantDeleteProduct.title} 成功`);
          this.getProducts();
          this.delProductModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
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
          this.tempUploadImg = e.target.result;
        };

        // to data url
        reader.readAsDataURL(curFile);
      }
    },
    uploadImg() {
      this.setLoading(1);
      const file = document.querySelector("[name=file-to-upload]").files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.$http
        .post(uploadImageUrl, formData)
        .then((res) => {
          if (res.data.success) {
            alert("上傳成功");
            this.tempImg = res.data.imageUrl;
            this.tempProduct.imagesUrl.unshift(this.tempImg);
            this.uploadModal.hide();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
  },
  watch: {
    nowPage(newVal) {
      if (newVal) {
        this.getProducts();
      }
    },
  },
  mounted() {
    this.checkAuth();
    this.productModal = new Modal(document.getElementById("productModal"));
    this.delProductModal = new Modal(
      document.getElementById("delProductModal")
    );
    this.uploadModal = new Modal(document.getElementById("uploadModal"));

    document
      .getElementById("uploadModal")
      .addEventListener("hidden.bs.modal", () => {
        this.tempUploadImg = "";
        this.returnEdit();
      });
  },
};
</script>

<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
