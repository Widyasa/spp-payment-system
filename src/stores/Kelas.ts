import {defineStore} from "pinia";
import axios from "axios";
import {apiUrl} from "@/helpers/global";
import {ref} from "vue";

export interface Kelas {
    nama: string
    kompetensi_keahlian: string
}

export const kelasApiStore = defineStore('kelasApiStore', () => {
    async function postCreate(request:object, pathUrl:string){
        return await axios.post(apiUrl + pathUrl, request)
    }
    async function postUpdate(request:object, id:string, pathUrl:string) {
        return await axios.put(apiUrl + pathUrl + `/${id}`, request)
    }
    async function postDelete(id:string, pathUrl:string) {
        return await axios.delete(apiUrl + pathUrl + `/${id}`)
    }
    async function getById(id:string, pathUrl:string) {
        return await axios.get(apiUrl + pathUrl + `/${id}`)
    }
    async function getAll(pathUrl:string) {
        return await axios.get(apiUrl + pathUrl)
    }

    return{
        postCreate,
        postUpdate,
        postDelete,
        getById,
        getAll
    }
})

export const useKelasStore = defineStore('useKelasStore', () => {
    const kelas = ref<Kelas>({} as Kelas)
    const kelasList = ref<Kelas[]>([] as Kelas[])

    const {postCreate, postUpdate, postDelete, getById, getAll} = kelasApiStore()
    async function createKelas(kelas:Kelas){
        return await postCreate(kelas, 'kelas/tambah')
    }
    async function updateKelas(kelas:Kelas, id:string){
        return await  postUpdate(kelas, id, 'kelas/edit')
    }
    async function deleteKelas(id:string) {
        return await postDelete(id, 'kelas/hapus')
    }
    async function getAllKelas(){
        return await getAll('kelas')
    }
    async function getKelasById(id:string){
        return await getById(id, 'kelas')
    }

    return {createKelas, updateKelas, deleteKelas, getAllKelas, getKelasById, kelas, kelasList}
})