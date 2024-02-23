<script setup lang="ts">
import type {Pembayaran} from "@/stores/Pembayaran";
import {usePembayaranStore} from "@/stores/Pembayaran";
import {storeToRefs} from "pinia";
import {onBeforeMount, onMounted, onUnmounted, reactive, ref, watch} from "vue";

const props = defineProps(['pembayaranId', 'message-pembayaran'])
const isLoading = ref(false)
const {updatePembayaran, getPembayaranById} = usePembayaranStore()
const {pembayaran} = storeToRefs(usePembayaranStore())

const pembayaranState = reactive({
  tahun_ajaran: '',
  nominal: ''
} as Pembayaran)
const emit = defineEmits(['list-pembayaran', 'message-pembayaran'])


const getPembayaranByIdModel = async () => {
  try {
    const response = await getPembayaranById(props.pembayaranId)
    const {data} = response.data
    pembayaranState.tahun_ajaran = data.pembayaran[0].tahun_ajaran
    pembayaranState.nominal = data.pembayaran[0].nominal
  } catch (e){
    return e
  }
}
const updatePembayaranModel = async () => {
  try {
    const response = await updatePembayaran(pembayaranState, props.pembayaranId)
    const {data, message} = response.data
    console.log(response.data)
    if (response.status == 200) {
      console.log('sukses')
      emit('list-pembayaran')
      emit('message-pembayaran', response.data.message)
    }
  } catch (error) {
    console.error(error)
  }
  console.log(pembayaran.value)
}
watch(() => props.pembayaranId, async (newValue, oldValue) => {
  if (newValue) {
    isLoading.value = true;
    await getPembayaranByIdModel();
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="modal" id="modalPembayaranUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Pembayaran</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="updatePembayaranModel()">

          <div class="modal-body d-flex flex-column gap-3" v-if="isLoading">
           <h1>loading</h1>
          </div>
          <div class="modal-body d-flex flex-column gap-3" v-if="!isLoading">
            <input type="text" v-model="pembayaranState.tahun_ajaran"  class="form-control" placeholder="nama pembayaran">
            <input type="text" v-model="pembayaranState.nominal" class="form-control" placeholder="kompetensi keahlian">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('list-pembayaran')">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Ubah Pembayaran</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>