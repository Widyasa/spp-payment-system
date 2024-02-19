<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import {token} from "@/helpers/global";
if (token.value){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
}
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
