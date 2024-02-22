<script setup lang="ts">
import type {Kelas} from "@/stores/Kelas";
import {useKelasStore} from "@/stores/Kelas";
import {storeToRefs} from "pinia";
import {onBeforeMount, onMounted, onUnmounted, reactive, ref, watch} from "vue";

const props = defineProps(['kelasId', 'message-kelas'])
const isLoading = ref(false)
const {updateKelas, getKelasById} = useKelasStore()
const {kelas} = storeToRefs(useKelasStore())

const kelasState = reactive({
  nama: '',
  kompetensi_keahlian: ''
} as Kelas)
const emit = defineEmits(['list-kelas', 'message-kelas'])


const getKelasByIdModel = async () => {
  try {
    const response = await getKelasById(props.kelasId)
    const {data} = response.data
    kelasState.nama = data.kelas[0].nama
    kelasState.kompetensi_keahlian = data.kelas[0].kompetensi_keahlian
  } catch (e){
    return e
  }
}
const updateKelasModel = async () => {
  try {
    const response = await updateKelas(kelasState, props.kelasId)
    const {data, message} = response.data
    console.log(response.data)
    if (response.status == 200) {
      console.log('sukses')
      emit('list-kelas')
      emit('message-kelas', response.data.message)
    }
  } catch (error) {
    console.error(error)
  }
  console.log(kelas.value)
}
watch(() => props.kelasId, async (newValue, oldValue) => {
  if (newValue) {
    isLoading.value = true;
    await getKelasByIdModel();
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="modal" id="modalKelasUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Kelas</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="updateKelasModel()">

          <div class="modal-body d-flex flex-column gap-3" v-if="isLoading">
           <h1>loading</h1>
          </div>
          <div class="modal-body d-flex flex-column gap-3" v-if="!isLoading">
            <input type="text" v-model="kelasState.nama"  class="form-control" placeholder="nama kelas">
            <input type="text" name="kompetensi_keahlian" id="" v-model="kelasState.kompetensi_keahlian" class="form-control" placeholder="kompetensi keahlian">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('list-kelas')">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Ubah Kelas</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>