<script setup lang="ts">
import {useKelasStore} from "@/stores/Kelas";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const {getAllKelas} = useKelasStore()
const {kelas, kelasList} = storeToRefs(useKelasStore())
const getKelasModel = async ()  => {
  try {
    const response = await getAllKelas()
    const {data, message} = response.data
    kelasList.value = data.kelases
    console.log(message)
  } catch (error) {
    console.error('api error', error.message)
  }
}
onMounted(() => {
  getKelasModel()
})
</script>

<template>
  <table class="table table-border">
    <thead>
    <tr>
      <th>No.</th>
      <th>Nama</th>
      <th>Kompetensi Keahlian</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>

    <tr v-for="(kelas, index) in kelasList" :key="kelas.id">
      <td>{{ index+1 }}</td>
      <td>{{ kelas.nama }}</td>
      <td>{{ kelas.kompetensi_keahlian }}</td>
<!--      <td>-->
<!--        <button @click="showFromEdit(subject)">edit</button>-->
<!--        <button @click="deleteSubjectModel(subject.id)">delete</button>-->
<!--      </td>-->
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>