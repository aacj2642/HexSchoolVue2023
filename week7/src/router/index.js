import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: "text-success",
  routes: [
    {
      path: "/",
      name: "user",
      component: () => import("../views/UserView.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../views/userViews/IndexView.vue"),
        },
        {
          path: "products",
          name: "userProducts",
          component: () => import("../views/userViews/ProductsView.vue"),
        },
        {
          path: "product/:productId",
          name: "userProduct",
          component: () => import("../views/userViews/ProductView.vue"),
          props: true,
        },
        {
          path: "cart",
          name: "userCart",
          component: () => import("../views/userViews/CartView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../views/adminViews/LoginView.vue"),
        },
        {
          path: "products",
          name: "productsDefault",
          redirect: "/admin/products/1",
          children: [
            {
              path: ":nowPage",
              name: "products",
              component: () => import("../views/adminViews/ProductsView.vue"),
              props: true,
            },
          ],
        },
        {
          path: "orders",
          name: "ordersDefault",
          redirect: "/admin/orders/1",
          children: [
            {
              path: ":nowPage",
              name: "orders",
              component: () => import("../views/adminViews/OrdersView.vue"),
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/UserView.vue"),
    },
  ],
});

export default router;
