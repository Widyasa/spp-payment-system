<script setup lang="ts">

import {useKelasStore} from "@/stores/Kelas";

const props = defineProps(['kelasId', 'message-kelas'])

const {deleteKelas} = useKelasStore()
const emit = defineEmits(['list-kelas', 'message-kelas'])
  const deleteKelasModel = async () => {
    try {
      const response = await deleteKelas(props.kelasId)
      const {data, message} = response.data
      if (response.status == 200) {
        emit('list-kelas')
        emit('message-kelas', response.data.message)
      }
    } catch (error) {
      console.error(error?.message)
    }
  }
</script>

<template>
  <div class="modal" id="modalKelasDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Kelas</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="deleteKelasModel">
          Yakin Mau Hapus ?
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Hapus Kelas</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>