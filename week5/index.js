const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL("./zh_TW.json");

configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true,
});

import {
  userGetProductsUrl,
  userGetProductUrl,
  userOptCartUrl,
  userOptCartsUrl,
  userOptOrder,
} from "../apiPath.js";

import ProductModal from "./ProductModal.js";

const app = Vue.createApp({
  data() {
    return {
      productModal: null,
      loadingCount: 0,
      loadingItem: [],
      products: [],
      product: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      cart: {},
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    VueLoading: VueLoading.Component,
    ErrorMessage: ErrorMessage,
    ProductModal,
  },
  methods: {
    getProducts() {
      this.loadingCount += 1;
      axios
        .get(userGetProductsUrl)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then((response) => {
          this.loadingCount -= 1;
        });
    },
    checkItemLoading(id) {
      return this.loadingItem.includes(id);
    },
    addItemLoading(id) {
      this.loadingItem.push(id);
    },
    removeItemLoading(id) {
      const index = this.loadingItem.findIndex((i) => {
        return i == id;
      });
      if (index > -1) {
        this.loadingItem.splice(index, 1);
      }
    },
    getProduct(id) {
      this.addItemLoading(id);
      axios
        .get(`${userGetProductUrl}/${id}`)
        .then((response) => {
          this.removeItemLoading(id);
          this.product = response.data.product;
          this.$refs.productModal.openModal();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      this.addItemLoading(id);
      const cart = {
        product_id: id,
        qty,
      };
      this.$refs.productModal.hideModal();
      axios
        .post(userOptCartUrl, { data: cart })
        .then((response) => {
          alert(response.data.message);
          this.removeItemLoading(id);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateCart(data) {
      this.addItemLoading(data.id);
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      axios
        .put(`${userOptCartUrl}/${data.id}`, { data: cart })
        .then((response) => {
          alert(response.data.message);
          this.removeItemLoading(data.id);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.removeItemLoading(data.id);
        });
    },
    deleteAllCarts() {
      axios
        .delete(userOptCartsUrl)
        .then((response) => {
          alert(response.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getCart() {
      this.loadingCount += 1;
      axios
        .get(userOptCartUrl)
        .then((response) => {
          this.cart = response.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then((response) => {
          this.loadingCount -= 1;
        });
    },
    removeCartItem(id) {
      this.addItemLoading(id);
      axios
        .delete(`${userOptCartUrl}/${id}`)
        .then((response) => {
          alert(response.data.message);
          this.removeItemLoading(id);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createOrder() {
      const order = this.form;
      if (this.cart.carts.length < 1) {
        alert("購物車為空，請加入商品");
        return false;
      }
      axios
        .post(userOptOrder, { data: order })
        .then((response) => {
          alert(response.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  computed: {
    isLoading() {
      return this.loadingCount > 0;
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
}).mount("#app");
