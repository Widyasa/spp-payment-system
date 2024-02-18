<script setup lang="ts">
defineProps(['title','button_type'])
</script>

<template>
  <button class="btn-primary btn" :type="button_type">{{title}}</button>
</template>

<style scoped>

</style>