<script setup lang="ts">
import {Siswa, useSiswaStore} from "@/stores/Siswa";
import {onMounted, reactive} from "vue";
import {useKelasStore} from "@/stores/Kelas";
import {storeToRefs} from "pinia";
import {usePembayaranStore} from "@/stores/Pembayaran";

const {createSiswa} = useSiswaStore()
const {getAllKelas} = useKelasStore()
const {getAllPembayaran} = usePembayaranStore()
const {kelasList} = storeToRefs(useKelasStore())
const {pembayaranList} = storeToRefs(usePembayaranStore())

const emit = defineEmits(['list-siswa', 'message-siswa'])
let siswaState = reactive({
  nisn : '',
  nis : '',
  nama : '',
  alamat : '',
  telepon : '',
  kelas_id : '',
  pengguna_id : '',
} as Siswa)
const getDataKelasModel = async () => {
  try {
    const response = await getAllKelas()
    const {data, message} = response.data
    kelasList.value = data.kelases
  } catch (e) {
    console.error('api error', e)
  }
}
const createSiswaModel = async () => {
  try{
    const response = await createSiswa(siswaState)
    const {data, message} = response.data
    console.log(response.data.message)
    if (response.status == 200) {
          siswaState.nisn = '',
          siswaState.nis = '',
          siswaState.nama = '',
          siswaState.alamat = '',
          siswaState.telepon = '',
          siswaState.kelas_id = '',
          siswaState.pengguna_id = '',
      emit('list-siswa')
      emit('message-siswa', response.data.message)
    }
  } catch (error) {
    console.error(error?.message)
  }
}
onMounted(() => {
  getAllKelas()
})
</script>

<template>
  <form action="">
    <div class="row">
      <div class="col-6">
        <input type="text" v-model="siswaState.nisn" class="form-control" placeholder="nisn">
      </div>
      <div class="col-6">
        <input type="text" v-model="siswaState.nis" class="form-control" placeholder="nisn">
      </div>
      <div class="col-12">
        <input type="text" v-model="siswaState.nama" class="form-control" placeholder="nisn">
      </div>
      <div class="col-12">
        <textarea type="text" v-model="siswaState.alamat" class="form-control" placeholder="alamat"></textarea>
      </div>
    </div>

  </form>
</template>

<style scoped>

</style>