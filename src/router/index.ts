import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/admin/Dashboard.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import SiswaIndex from "@/views/admin/Siswa/SiswaIndex.vue";
import {admin, token} from "@/helpers/global";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/dashboard',
      // meta: {isPrivate: true, isAdmin:false}
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: Dashboard,
      // meta: {isPrivate: true, isAdmin:false}
    },
    {
      path:'/siswa',
      name:'siswa',
      component: SiswaIndex,
      // meta: {isPrivate: true, isAdmin:true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      // meta: {isPrivate: false, isAdmin: false}
    }
  ]
})

// router.beforeEach(async (to, from) => {
//   if (!token.value && to.meta.isPrivate) {
//     return {name: "login"}
//   }
//   if (token.value && !to.meta.isPrivate) {
//     return {name:"dashboard"}
//   }
//   if (!admin && to.meta.isAdmin) {
//     return {name:"dashboard"}
//   }
//
// })
export default router
