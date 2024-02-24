import {defineStore} from "pinia";
import {ref} from "vue";
import {allApiStore} from "@/stores/GlobalStore";


export interface Siswa{
    id : string
    nisn : string
    nis : string
    nama : string
    alamat : string
    telepon : string
    kelas_id : string
    pembayaran_id : string
    pengguna_id : string
    nama_kelas: string
}

export const useSiswaStore = defineStore('useSiswaStore', () => {
    const siswa = ref<Siswa>({} as Siswa)
    const siswaList = ref<Siswa[]>([] as Siswa[])

    const {postCreate, postUpdate, postDelete, getById, getAll} = allApiStore()
    async function createSiswa(siswa:Siswa){
        return await postCreate(siswa, 'siswa/tambah')
    }
    async function updateSiswa(siswa:Siswa, id:string){
        return await  postUpdate(siswa, id, 'siswa/edit')
    }
    async function deleteSiswa(id:string) {
        return await postDelete(id, 'siswa/hapus')
    }
    async function getAllSiswa(){
        return await getAll('siswa')
    }
    async function getSiswaById(id:string){
        return await getById(id, 'siswa/edit')
    }

    return {createSiswa, updateSiswa, deleteSiswa, getAllSiswa, getSiswaById, siswa, siswaList}
})