<script setup lang="ts">
  import {onMounted} from "vue";
  import {isAdminPetugas} from "@/helpers/authValidation";

  onMounted(() => {
    isAdminPetugas()
  })
</script>

<template>
    <h1>ini siswa</h1>
</template>

<style scoped>

</style>