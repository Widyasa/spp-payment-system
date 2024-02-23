<script setup lang="ts">
import {Pembayaran, usePembayaranStore} from "@/stores/Pembayaran";
import {reactive} from "vue";

const {createPembayaran} = usePembayaranStore()

const emit = defineEmits(['list-pembayaran', 'message-pembayaran'])
let pembayaranState = reactive({
  tahun_ajaran: '',
  nominal:''
} as Pembayaran)
const createPembayaranModel = async () => {
  try{
    const response = await createPembayaran(pembayaranState)
    const {data, message} = response.data
    console.log(response.data.message)
    if (response.status == 200) {
      pembayaranState.tahun_ajaran = ''
      pembayaranState.nominal = ''
      emit('list-pembayaran')
      emit('message-pembayaran', response.data.message)
    }
  } catch (error) {
    console.error(error?.message)
  }
}
</script>

<template>
  <div class="modal" id="modalPembayaranCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Pembayaran</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createPembayaranModel">
          <div class="modal-body d-flex flex-column gap-3">
            <input type="text" v-model="pembayaranState.tahun_ajaran" class="form-control" placeholder="tahun ajaran">
            <input type="text" v-model="pembayaranState.nominal" class="form-control" placeholder="nominal">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Simpan Pembayaran</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>