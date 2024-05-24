<template>
  <div>
    <h1>Stockage de Photos</h1>
    <div v-for="(photo, index) in photos" :key="photo.id">
      <img :src="photo.url" :alt="'Stored photo ' + index" :class="photo.isOnline ? 'online' : 'offline'">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    photos() {
      return this.$store.getters.allPhotos;
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 10px;
  border: 1px solid black;
}

.online {
  border: 2px solid green;
}

.offline {
  border: 2px solid red;
}
</style>
