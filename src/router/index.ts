import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/admin/Dashboard.vue";
import LoginPage from "@/views/auth/LoginPage.vue";

const testCondition = true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/dashboard',
      // meta: {requireAuth: true}
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: Dashboard,
      // meta: {isPrivate: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      // meta: {isPrivate: false}
    }
  ]
})

// router.beforeEach(async (to, from) => {
//   if (!testCondition && to.meta.isPrivate) {
//     return {name: "login"}
//   }
//   if (testCondition && !to.meta.isPrivate) {
//     return {name:"dashboard"}
//   }
// })
export default router
