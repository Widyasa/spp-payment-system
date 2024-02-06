<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/User";
import {storeToRefs} from "pinia";
import {admin, token} from "@/helpers/global";

const {getLoginCookie, loginUser, getDataDashboard} = useUserStore()
const {dashboardList} = storeToRefs(useUserStore())

async function receiveDataUser() {
  try {
    const response = await getDataDashboard()
    const {data} = response.data
    dashboardList.value = data
  } catch (error) {
    console.error("API Error:", error.message)
  }
}
console.log(token)
// const dataUser = async () => {
//   try{
//     const response = await getDataDashboard()
//     const {data} = response.data
//     dashboardList.value = data
//     console.log(dashboardList.value.user.role)
//     localStorage.setItem('role', dashboardList.value.user.role)
//   } catch (error:any) {
//     console.error("API Error:", error.message)
//   }
// }

if (!token.value){
  router.push({name:'login'})
} else {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  await receiveDataUser()
}

  onMounted( () => {
    // console.log(token.value)
    if (!token.value) {
      // router.push({name: 'login'})
    }
    // else {
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    //   dataUser()
    // }
  })

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    return router.push({name: 'login'})
  }
</script>

<template>
  <h1>this is dashboard</h1>
  <button @click="logout">Logout</button>
  <RouterLink :to="{name:'siswa'}" v-show="admin">siswa</RouterLink>
</template>

<style scoped>

</style>