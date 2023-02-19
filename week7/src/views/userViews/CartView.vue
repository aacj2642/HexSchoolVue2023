<template>
  <div class="text-end">
    <button
      v-if="cart.total"
      class="btn btn-outline-danger"
      type="button"
      @click="deleteAllCarts"
    >
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div v-if="item.coupon" class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  min="1"
                  v-model.number="item.qty"
                  @change="updateCart(item)"
                  type="number"
                  class="form-control"
                />
                <span class="input-group-text" id="basic-addon2">{{
                  item.product.unit
                }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small v-if="cart.final_total !== cart.total" class="text-success"
              >折扣價：</small
            >
            {{ item.final_total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr v-if="cart.final_total !== cart.total">
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <!-- 購買表單 -->
  <div class="my-5 row justify-content-center">
    <VForm
      ref="form"
      class="col-md-6"
      v-slot="{ errors, meta }"
      @submit="createOrder"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          v-model="form.user.email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
        ></VField>
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField
          v-model="form.user.name"
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
        ></VField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField
          v-model="form.user.tel"
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required|min:8|max:10"
        ></VField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField
          v-model="form.user.address"
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
        ></VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          v-model="form.message"
          id="message"
          class="form-control"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="text-end">
        <!-- 若是購物車有商品，且表單填寫過且驗證通過，才可以按按鈕 -->
        <button
          :disabled="!(cart.total && meta.dirty && meta.valid)"
          type="submit"
          class="btn btn-danger"
        >
          送出訂單
        </button>
      </div>
    </VForm>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import {
  userOptCartUrl,
  userOptCartsUrl,
  userOptOrder,
} from "../../apiPath.js";
import appStore from "../../stores/appStore.js";

export default {
  name: "CartView",
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    ...mapActions(appStore, ["setLoading"]),
    getCart() {
      this.setLoading(1);
      this.$http
        .get(userOptCartUrl)
        .then((response) => {
          this.cart = response.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    updateCart(data) {
      this.setLoading(1);
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      this.$http
        .put(`${userOptCartUrl}/${data.id}`, { data: cart })
        .then((response) => {
          alert(response.data.message);
          this.setLoading(-1);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.setLoading(-1);
        });
    },
    deleteAllCarts() {
      this.setLoading(1);
      this.$http
        .delete(userOptCartsUrl)
        .then((response) => {
          alert(response.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.setLoading(-1);
        });
    },
    removeCartItem(id) {
      this.setLoading(1);
      this.$http
        .delete(`${userOptCartUrl}/${id}`)
        .then((response) => {
          alert(response.data.message);
          this.setLoading(-1);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    createOrder() {
      const order = this.form;
      if (this.cart.carts.length < 1) {
        alert("購物車為空，請加入商品");
        return false;
      }
      this.setLoading(1);
      this.$http
        .post(userOptOrder, { data: order })
        .then((response) => {
          alert(response.data.message);
          this.$refs.form.resetForm();
          this.form.message = "";
          this.getCart();
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
    this.getCart();
  },
};
</script>

<style scoped></style>
