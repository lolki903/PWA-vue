<template>
  <div id="app">
    <network-status></network-status> 
    <router-view/>
  </div>
</template>

<script>
import NetworkStatus from '@/components/NetworkStatus.vue';

// Une fonction asynchrone pour simuler le chargement de données
async function someAsyncFunction() {
  return "Data loaded";
}

export default {
  name: 'App',
  components: {
    NetworkStatus
  },
  async created() {
    try {
      const result = await someAsyncFunction();
      console.log(result);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
