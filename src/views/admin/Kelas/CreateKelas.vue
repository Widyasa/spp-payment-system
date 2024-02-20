<script setup lang="ts">
import {Kelas, useKelasStore} from "@/stores/Kelas";
import {reactive} from "vue";

const {createKelas} = useKelasStore()
const emit = defineEmits(['list-kelas'])
let kelasState = reactive({
  nama: '',
  kompetensi_keahlian:''
} as Kelas)
const createKelasModel = async () => {
  try{
    const response = await createKelas(kelasState)
    const {data, message} = response.data
    console.log(response.data.message)
    if (response.status == 200) {
      emit('list-kelas')
      localStorage.setItem('message', response.data.message)
    }
  } catch (error) {
    console.error(error?.message)
  }
}
</script>

<template>
  <div class="modal" id="modalKelasCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Kelas</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createKelasModel">
          <div class="modal-body d-flex flex-column gap-3">
            <input type="text" v-model="kelasState.nama" class="form-control" placeholder="nama kelas">
            <input type="text" name="kompetensi_keahlian" id="" v-model="kelasState.kompetensi_keahlian" class="form-control" placeholder="kompetensi keahlian">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Simpan Kelas</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>