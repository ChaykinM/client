import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'doc',
    meta: { requiresAuth: false, title: 'Описание решения' },
    component: () => import(/* webpackChunkName: "doc" */ '../views/common/DocView.vue')
  },
  /* Авторизация */
  {
    path: '/auth/login',
    name: 'login',
    meta: { requiresAuth: false, title: 'Авторизация' },
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    meta: { requiresAuth: false, title: 'Регистрация' },
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/RegisterView.vue')
  },
  /* Аккаунт пользователя */
  {
    path: '/account/tasks', 
    name: "tasks", 
    meta: { requiresAuth: true, requiresEditorRules: false, requiresAdminRules: false,   title: 'Механизмы' },
    component: () => import(/* webpackChunkName: "tasks" */ '../views/account/TasksView.vue')
  }, 
  {
    path: '/account/scoreboard', 
    name: "scoreboard", 
    meta: { requiresAuth: true, requiresEditorRules: false, requiresAdminRules: false,   title: 'Рейтинговая статистика' },
    component: () => import(/* webpackChunkName: "tasks_manager" */ '../views/account/ScoreboardView.vue')
  }, 
  {
    path: '/account/tasks_manager', 
    name: "tasks_manager", 
    meta: { requiresAuth: true, requiresEditorRules: true, requiresAdminRules: true,   title: 'Добавить задачу' },
    component: () => import(/* webpackChunkName: "tasks_manager" */ '../views/account/TasksManagerView.vue')
  }, 
  {
    path: '/account/users_manager', 
    name: "users_manager", 
    meta: { requiresAuth: true, requiresEditorRules: false, requiresAdminRules: true,   title: 'Управление пользователями' },
    component: () => import(/* webpackChunkName: "tasks_manager" */ '../views/account/UsersManagerView.vue')
  }, 
  {
    path: "/404",
    name: "pageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "page-not-found" */ "../views/PageNotFound.vue"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const isAuthenticated = localStorage.getItem("token") !== null ? true : false;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) 
  { 
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
        next({
      name: "tasks",
    }); // каждый запрос к серверу должен сопровождаться токеном, если токен не валидный сервер должен возвращять статус "Не авторизирован", то удалять токен из стора и localStorage
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || "Тестирование";
});

export default router
