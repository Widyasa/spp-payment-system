<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {User} from "@/stores/User";
import {useUserStore} from "@/stores/User";
import {useRouter} from "vue-router";
import router from "@/router";
// import router from "@/router";

const route = useRouter()

  const loggedIn = ref(localStorage.getItem('loggedIn'))
  const token = ref(localStorage.getItem('token'))
  const {getLoginCookie, loginUser} = useUserStore()
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

onMounted(() => {
  if (token.value) {
    router.push({ name: 'dashboard' });
  }
});

const login = async () => {
    if (userState.username && userState.password) {
      try {
        const cookie = await getLoginCookie();
        console.log(cookie)
        const {data} = await loginUser(userState)
        console.log(data.message)
        if (data.message === 'success') {
          localStorage.setItem('LoggedIn', 'true')
          localStorage.setItem('token', data.data.token)
          loggedIn.value = String(true)
          // router.onError(e => {console.log(e)})
          // return router.push({name : 'dashboard'})
          return route.push("/")


        } else {
          loginFailed.value = true;
          console.log('error')
        }
      } catch (error) {
        console.error(error);
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