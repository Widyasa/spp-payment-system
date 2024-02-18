<script setup lang="ts">

import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="row">
    <div class="col-2">
      <Sidebar />
    </div>
    <div class="col-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>