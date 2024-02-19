<script setup lang="ts">

import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="row template-row">
    <div class="col-2">
      <Sidebar />
    </div>
    <div class="col-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.template-row{
  width: 100vw;
}
</style>