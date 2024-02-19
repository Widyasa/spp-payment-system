<script setup lang="ts">

import {admin, petugas} from "@/helpers/global";
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