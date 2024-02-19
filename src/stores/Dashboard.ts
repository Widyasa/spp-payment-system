import axios from "axios";
import {apiUrl} from "@/helpers/global";
import {defineStore} from "pinia";
import {ref} from "vue";


export interface Dashboard{
    nama: ''
    role: ''
    countSiswa: ''
    countKelas: ''
    countPetugas: ''
    countTransaksi: ''
}

export const dashboardApiStore = defineStore('userApiStore', () => {

    async function getAll(pathUrl:string) {
        return await axios.get(apiUrl + pathUrl)
    }
    return {
        getAll
    }
})

export const useDashboardStore = defineStore('useDashboardStore' , () => {
    const dashboardList = ref<Dashboard>({} as Dashboard)
    const {getAll} = dashboardApiStore()

    async function getDataDashboard() {
        return await getAll('dashboard')
    }
    return {getDataDashboard , dashboardList}
})