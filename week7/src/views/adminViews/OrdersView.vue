<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, key) in orders" :key="key">
          <tr
            v-if="orders.length"
            :class="{ 'text-secondary': !order.is_paid }"
          >
            <td>{{ setDate(order.create_at) }}</td>
            <td><span v-text="order.user.email" v-if="order.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in order.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  style="cursor: pointer"
                  type="checkbox"
                  :id="`paidSwitch${order.id}`"
                  v-model="order.is_paid"
                  @change="updatePaid(order)"
                />
                <label class="form-check-label" :for="`paidSwitch${order.id}`">
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button">
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="deleteOrder(order)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PageList
      :pagination="pagination"
      :nowPage="nowPage"
      nowView="/admin/orders"
    ></PageList>
  </div>
</template>

<script>
import moment from "moment";
import PageList from "../../components/PageList.vue";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import appStore from "../../stores/appStore.js";

import { checkUrl, getOrdersUrl, operationOrdersUrl } from "../../apiPath.js";

export default {
  components: {
    PageList,
  },
  data() {
    return {
      pagination: {},
      orders: [],
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
              this.getOrders();
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
    setDate(time) {
      return moment.unix(time).format("YYYY/MM/DD HH:mm:ss");
    },
    getOrders() {
      // 檢查是不是正整數
      if (!this.isPositiveInteger(this.nowPage)) {
        this.$router.push(`/admin/orders/1`);
        return false;
      }
      this.setLoading(1);
      this.$http
        .get(getOrdersUrl, {
          params: { page: this.nowPage },
        })
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          if (this.pagination.total_pages < parseInt(this.nowPage)) {
            this.$router.push(`/admin/orders/${this.pagination.total_pages}`);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    updatePaid(order) {
      this.setLoading(1);
      const paid = {
        is_paid: order.is_paid,
      };
      this.$http
        .put(`${operationOrdersUrl}/${order.id}`, { data: paid })
        .then(() => {
          alert("更新付款狀態");
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    deleteOrder(order) {
      const orderItems = Object.values(order.products)
        .map((product) => {
          return (
            `<tr>` +
            `<td>${product.product.title}</td>` +
            `<td>${product.product.price}</td>` +
            `<td>${product.qty}</td>` +
            `<td>${product.total}</td>` +
            `</tr>`
          );
        })
        .join("");
      console.log(orderItems);
      const deleteInfo = `
      <div>訂單時間:${this.setDate(order.create_at)}</div>
      <div>付款狀態:${order.is_paid ? "付款" : "未付款"}</div>
      <div>訂購者:${order.user.email}</div>
      <div>訂單內容
        <table style='margin: 0 auto;'>
          <tr>
            <th>商品名稱</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
          </tr>
          ${orderItems}
        </table>
      </div>`;
      Swal.fire({
        title: "你確定要刪除此訂單?",
        icon: "warning",
        html: deleteInfo,
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.setLoading(1);
          this.$http
            .delete(`${operationOrdersUrl}/${order.id}`)
            .then(() => {
              this.getOrders();
              alert("刪除成功");
            })
            .catch((err) => {
              alert(err.response.data.message);
            })
            .then(() => {
              this.setLoading(-1);
            });
        }
      });
    },
  },
  watch: {
    nowPage(newVal) {
      if (newVal) {
        this.getOrders();
      }
    },
  },
  mounted() {
    this.checkAuth();
  },
};
</script>

<style scoped></style>
