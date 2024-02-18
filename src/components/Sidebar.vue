<script setup lang="ts">

import {admin, petugas} from "@/helpers/global";
</script>

<template>
  <div class="border-end h-100 min-vh-100 p-4">
    <ul>
      <li class="nav-link">
        <RouterLink :to="{name: 'dashboard'}">Dashboard</RouterLink>
      </li>
      <li class="nav-link" v-show="admin || petugas">
        <RouterLink :to="{name: 'siswa'}">Siswa</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>