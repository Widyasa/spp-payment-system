<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {User} from "@/stores/User";
import {useUserStore} from "@/stores/User";
import {useRouter} from "vue-router";
import router from "@/router";
import axios from "axios";
import {storeToRefs} from "pinia";

const token = ref(localStorage.getItem('token'))
const route = useRouter()
const loggedIn = ref(localStorage.getItem('loggedIn'))
const {getLoginCookie, loginUser, getDataDashboard} = useUserStore()
const {dashboardList} = storeToRefs(useUserStore())
  let userState = reactive({
    username: "",
    password: ""
  } as User)
// // Add a Custom Validation type to fix object not found type checking error
type ValidationType = {
    username: boolean;
    password: boolean
}

const validation = reactive([]);
const loginFailed = ref(false);
const dataUser = async () => {
  try{
    const response = await getDataDashboard()
    const {data} = response.data
    dashboardList.value = data

    return true
  } catch (error:any) {
    console.error("API Error:", error.message)
    return false
  }
}

const login = async () => {
    if (userState.username && userState.password) {
      try {
        const cookie = await getLoginCookie();
        const {data} = await loginUser(userState)
        if (data.message === 'success') {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('role', data.data.user.role)
          location.reload()
          return router.push({name: 'dashboard'})
        } else {
          loginFailed.value = true;
          console.log('error')
        }
      } catch (error:any) {
        console.log(error);
        console.log('error')
      }
    } else {
      if (!userState.username) {
        validation.username = true;
      }
      if (!userState.password) {
        validation.password = true;
      }
    }
  };


</script>

<template>
  <form @submit.prevent="login" class="">
    <RouterLink :to="{name: 'dashboard'}">dashboard</RouterLink>
    <input type="text" name="username" v-model="userState.username" placeholder="username">
    <input type="text" name="password" v-model="userState.password" placeholder="password">
    <button type="submit">submit</button>
  </form>
</template>

<style scoped>

</style>