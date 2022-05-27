export const router = {
    base: process.env.API_BASE_URL,
    mode: "history",
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: "/book-detail/:title",
          component: resolve(__dirname, "pages/book-detail.vue"),
        }
      )
    },
  };
  