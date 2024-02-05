<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";

  const token = ref(localStorage.getItem('token'))
  const getDataDashboard = async () => {
    console.log('testing')
  }
  onMounted( () => {
    if (!token.value) {
      router.push({name: 'login'})
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      getDataDashboard()
    }
  })
</script>

<template>
  <h1>this is dashboard</h1>
</template>

<style scoped>

</style>