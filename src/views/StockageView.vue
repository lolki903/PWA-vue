<template>
    <div>
      <h1>Stockage de Photos</h1>
      <div v-for="(photo, index) in photos" :key="index">
        <img :src="photo.url" :alt="'Stored photo ' + index">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      photos() {
        return this.$store.state.photos;
      }
    }
  }
  </script>
