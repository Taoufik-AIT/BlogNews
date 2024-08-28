import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import ArticleView from "../views/ArticleView.vue";
import FavoritesView from "../views/FavoritesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: CatalogView,
  },
  {
    path: "/article/:id",
    name: "article",
    component: ArticleView,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;