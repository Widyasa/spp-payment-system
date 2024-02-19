<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {useUserStore} from "@/stores/User";
import {storeToRefs} from "pinia";
import {admin, token} from "@/helpers/global";
import {useDashboardStore} from "@/stores/Dashboard";

const {getLoginCookie, loginUser, getDataDashboard} = useUserStore()
const {dashboardList} = storeToRefs(useDashboardStore())

async function receiveDataUser() {
  try {
    const response = await getDataDashboard()
    const {data} = response.data
    dashboardList.value = data
    dashboardList.value.nama = data.user.nama
    dashboardList.value.countKelas = data.countKelas[0].countKelas
    dashboardList.value.countSiswa = data.countSiswa[0].countSiswa
    dashboardList.value.countPetugas = data.countPetugas[0].countPetugas

  } catch (error) {
    console.error("API Error:", error.message)
  }
}


  onMounted( () => {
    if (!token.value) {
      // router.push({name: 'login'})
    }
    else {
      console.log(token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      receiveDataUser()
    }
  })


</script>

<template>
  <h1>Nama yang Login: {{dashboardList.nama}}</h1>
  <h1>Total Kelas: {{dashboardList.countKelas}}</h1>
  <h1>Total Siswa: {{dashboardList.countSiswa}}</h1>
  <h1>Total Petugas: {{dashboardList.countPetugas}}</h1>
  <h1 style="color: black">this is dashboard</h1>
</template>

<style scoped>

</style>