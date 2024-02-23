import {defineStore} from "pinia";
import axios from "axios";
import {apiUrl} from "@/helpers/global";
import {ref} from "vue";
import {allApiStore} from "@/stores/GlobalStore";

export interface Pembayaran {
    id:string
    tahun_ajaran: string
    nominal: string
}
export const usePembayaranStore = defineStore('usePembayaranStore', () => {
    const pembayaran = ref<Pembayaran>({} as Pembayaran)
    const pembayaranList = ref<Pembayaran[]>([] as Pembayaran[])

    const {postCreate, postUpdate, postDelete, getById, getAll} = allApiStore()
    async function createPembayaran(pembayaran:Pembayaran){
        return await postCreate(pembayaran, 'pembayaran/tambah')
    }
    async function updatePembayaran(pembayaran:Pembayaran, id:string){
        return await  postUpdate(pembayaran, id, 'pembayaran/edit')
    }
    async function deletePembayaran(id:string) {
        return await postDelete(id, 'pembayaran/hapus')
    }
    async function getAllPembayaran(){
        return await getAll('pembayaran')
    }
    async function getPembayaranById(id:string){
        return await getById(id, 'pembayaran/edit')
    }

    return {createPembayaran, updatePembayaran, deletePembayaran, getAllPembayaran, getPembayaranById, pembayaran, pembayaranList}
})