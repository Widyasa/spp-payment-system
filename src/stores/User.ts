import {defineStore} from "pinia";
import axios from "axios";
import {apiCookie, apiUrl} from "@/global";
import {ref} from "vue";

export interface User{
    id:number
    username:string
    password:string
}

export const userApiStore = defineStore('userApiStore', () => {
    async function getCookie(pathUrl:string) {
        return await axios.get(apiCookie + pathUrl)
    }
    async function login(request:Object, pathUrl:string) {
        return await axios.post(apiUrl+pathUrl, request)
    }
    return {
        getCookie,
        login
    }
})

export const useUserStore = defineStore('useUserStore' , () => {
    const user = ref<User> ({} as User)
    const userList = ref<User[]>([] as User[])

    const {getCookie, login} = userApiStore()
    async function getLoginCookie() {
        return await getCookie('sanctum/csrf-cookie')
    }

    async function loginUser(user:User) {
        return await login(user, 'login')
    }
    return {getLoginCookie, loginUser, user, userList}
})