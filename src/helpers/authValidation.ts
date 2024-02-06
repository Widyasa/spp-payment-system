import {admin, petugas} from "@/helpers/global";
import router from "@/router";

export const isAdminPetugas = ( () => {
    if (!admin || !petugas){
        router.push({name: 'dashboard'})
    }
})
export const isAdmin = (() => {
    if (!admin){
        router.push({name: 'dashboard'})
    }
})