import {defineStore} from "pinia";
import axios from "axios";
import {apiCookie, apiUrl} from "@/helpers/global";
import {ref} from "vue";

export interface User{
    id:number
    username:string
    password:string
}
export interface Dashboard{
    user: {
        nama:string
        role:string
    },
    countSiswa:number
    countKelas:number
    countPetugas:number
    countTransaksi:number
}

export const userApiStore = defineStore('userApiStore', () => {
    async function getCookie(pathUrl:string) {
        return await axios.get(apiCookie + pathUrl)
    }
    async function login(request:Object, pathUrl:string) {
        return await axios.post(apiUrl+pathUrl, request)
    }

    async function getAll(pathUrl:string) {
        return await axios.get(apiUrl + pathUrl)
    }
    return {
        getCookie,
        login,
        getAll
    }
})

export const useUserStore = defineStore('useUserStore' , () => {
    const user = ref<User> ({} as User)
    const dashboardList = ref<Dashboard>({} as Dashboard)
    const {getCookie, login, getAll} = userApiStore()
    async function getLoginCookie() {
        return await getCookie('sanctum/csrf-cookie')
    }

    async function loginUser(user:User) {
        return await login(user, 'login')
    }

    async function getDataDashboard() {
        return await getAll('dashboard')
    }
    return {getLoginCookie, loginUser, getDataDashboard , user, dashboardList}
})