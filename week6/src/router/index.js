import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      ],
    },
  ],
});

export default router;
