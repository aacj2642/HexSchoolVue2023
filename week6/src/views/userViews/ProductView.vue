<template>
  <div class="row">
    <div class="col-sm-6">
      <img class="img-fluid" :src="product.imagesUrl" alt="" />
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
      <p>商品描述：{{ product.description }}</p>
      <p>商品內容：{{ product.content }}</p>
      <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
      <del class="h6" v-if="product.price"
        >原價 {{ product.origin_price }} 元</del
      >
      <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
      <div>
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            v-model.number="qty"
            min="1"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="addToCart(product.id, qty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { userGetProductUrl, userOptCartUrl } from "../../apiPath.js";
import appStore from "../../stores/appStore.js";
export default {
  name: "ProductView",
  props: ["productId"],
  data() {
    return {
      product: [],
      qty: 1,
    };
  },
  methods: {
    ...mapActions(appStore, ["setLoading"]),
    getProduct() {
      this.setLoading(1);
      this.$http
        .get(`${userGetProductUrl}/${this.productId}`)
        .then((response) => {
          this.product = response.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push(`/products`);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    addToCart(id, qty = 1) {
      this.setLoading(1);
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(userOptCartUrl, { data: cart })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped></style>
