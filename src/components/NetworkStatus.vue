<template>
  <div>
    <div v-if="isOnline">
      <h1>Mode En Ligne</h1>
      <p>Ce contenu est accessible lorsque vous êtes connecté à Internet.</p>
    </div>
    <div v-else>
      <h1>Mode Hors Ligne</h1>
      <p>Ce contenu est accessible uniquement en mode hors ligne.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NetworkStatus',
  data() {
    return {
      isOnline: navigator.onLine
    };
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    }
  },
  mounted() {
    this.updateOnlineStatus();
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
};
</script>
