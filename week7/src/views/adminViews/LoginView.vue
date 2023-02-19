<template>
  <template v-if="!isLoading">
    <div class="row justify-content-center">
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              v-model="username"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            <span> 登入 </span>
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2022~∞ - 六角學院</p>
  </template>
</template>

<script>
import { mapState, mapActions } from "pinia";
import appStore from "../../stores/appStore.js";
import { loginUrl, checkUrl } from "../../apiPath.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(appStore, ["setLoading", "setIsLogin"]),
    login() {
      this.setLoading(1);
      this.$http
        .post(loginUrl, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `token=${token};expires=${new Date(expired)};`;
          this.setIsLogin(true);
          this.$router.push("/admin/products/1");
        })
        .catch((err) => {
          this.setIsLogin(false);
          alert(`Error: ${err.message}`);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
    checkAuth() {
      this.setLoading(1);
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token.length != 0) {
        // 如果已經有 token，驗證通過後就可以自動導頁
        this.$http.defaults.headers.common["Authorization"] = token;
        this.checkToken();
      } else {
        this.setIsLogin(false);
        this.setLoading(-1);
      }
    },
    checkToken() {
      this.$http
        .post(checkUrl)
        .then((res) => {
          if (res.data.success) {
            this.setIsLogin(true);
            this.$router.push("/admin/products/1");
          }
        })
        .catch((err) => {
          this.setIsLogin(false);
          alert(err.response.data.message);
        })
        .then(() => {
          this.setLoading(-1);
        });
    },
  },
  computed: {
    ...mapState(appStore, ["loading"]),
    isLoading() {
      return this.loading > 0;
    },
  },
  mounted() {
    this.checkAuth();
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
