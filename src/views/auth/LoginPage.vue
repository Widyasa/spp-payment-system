<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {User} from "@/stores/User";
import {useUserStore} from "@/stores/User";
import {useRouter} from "vue-router";
import router from "@/router";
import axios from "axios";
import {storeToRefs} from "pinia";
import PrimaryButton from "@/components/PrimaryButton.vue";

const token = ref(localStorage.getItem('token'))
const route = useRouter()
const {getLoginCookie, loginUser} = useUserStore()
  let userState = reactive({
    username: "",
    password: ""
  } as User)

const loginValidation = ref(false)
const usernameValidation = ref(false)
const passwordValidation = ref(false)
window.setInterval(() => {
  usernameValidation.value = false;
  passwordValidation.value = false;
  loginValidation.value = false;
}, 5000);

const loginFailed = ref(false);


const login = async () => {
    if (userState.username && userState.password) {
      usernameValidation.value = false
      passwordValidation.value = false
      try {
        const cookie = await getLoginCookie();
        const {data} = await loginUser(userState)
        if (data.message === 'success') {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('role', data.data.user.role)
          location.reload()
          return router.push({name: 'dashboard'})
        } else {
          console.log('error')
        }
      } catch (error:any) {
        loginValidation.value = true
        console.log(error);
        console.log('error')
      }
    }
    else if (!userState.username){
      usernameValidation.value = true
    } else if (!userState.password) {
      passwordValidation.value = true
    } else{
      usernameValidation.value = true
      passwordValidation.value = true
    }
  };


</script>

<template>
  <div class="form-login">
    <div class="d-block">
      <h6 class="text-primary" v-show="loginValidation">Login error periksa kembali username dan password anda</h6>
      <form @submit.prevent="login" class="d-flex flex-column gap-3">
        <div class="">
          <input type="text" v-model="userState.username" class="form-control" placeholder="username">
          <p class="text-danger" v-show="usernameValidation">username kosong</p>
        </div>
        <div class="">
          <input type="password" v-model="userState.password" class="form-control" placeholder="password">
          <p class="text-danger" v-show="usernameValidation">password kosong</p>
        </div>
        <PrimaryButton title="submit" button_type="submit"/>
      </form>
      <p>{{userState.username}}</p>
    </div>
  </div>
</template>

<style scoped>
  .form-login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>