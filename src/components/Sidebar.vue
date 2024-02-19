<script setup lang="ts">

import {admin, petugas} from "@/helpers/global";
import router from "@/router";
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  location.reload()
  return router.push({name: 'login'})
}
</script>

<template>
  <div class="border-end h-100 min-vh-100 p-4">
    <ul class="nav-item">
      <li class="nav-link" >
        <RouterLink class="nav" :to="{name: 'dashboard'}" active-class="active">Dashboard</RouterLink>
      </li>
      <li class="nav-link" v-show="admin || petugas">
        <RouterLink class="nav" :to="{name: 'siswa'}">Siswa</RouterLink>
      </li>
      <li class="nav-link" v-show="admin || petugas">
        <RouterLink class="nav" :to="{name: 'siswa'}">Kelas</RouterLink>
      </li>
      <li class="nav-link">
        <button @click="logout" class="btn btn-primary">Logout</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .nav-link .nav{
    color: grey !important;
    text-decoration: none;
    width: 100%;
    transition: 0.2s;
    border-radius: 4px;
    margin-top: 8px;
    padding: 12px 14px;
  }
  .nav:hover, .nav.active{
    color: black !important;
    background: grey;
  }
</style>