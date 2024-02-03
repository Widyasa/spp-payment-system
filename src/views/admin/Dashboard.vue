<script setup lang="ts">
import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";
import axios from "axios";

  const token = localStorage.getItem('token')
  const router = useRouter()
  const getDataDashboard = async () => {
    console.log('testing')
  }
  onMounted(async () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      await getDataDashboard()
    }
  })
  onMounted(() => {
    if (!token.value) {
      router.push({name: 'login'})
      // console.log('gada nok')
    }
  })
</script>

<template>
  <h1>this is dashboard</h1>
</template>

<style scoped>

</style>