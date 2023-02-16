<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </td>
        <td>{{ product.title }}</td>
        <td>
          <div class="h5">{{ product.price }} 元</div>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="goToProduct(product)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              查看詳細
            </button>
            <!-- <button
              type="button"
              class="btn btn-outline-danger"
              @click="addToCart(product.id)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              加到購物車
            </button> -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from "pinia";
import { userGetProductsUrl } from "../../apiPath.js";
import appStore from "../../stores/appStore.js";
export default {
  name: "ProductView",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    ...mapActions(appStore, ["setLoading"]),
    getProducts() {
      this.setLoading(1);
      this.$http
        .get(userGetProductsUrl)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    goToProduct(product) {
      this.$router.push(`/product/${product.id}`);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped></style>
