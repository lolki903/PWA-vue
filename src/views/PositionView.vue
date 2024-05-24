<template>
    <div>
      <p v-if="latitude !== null && longitude !== null">Latitude: {{ latitude }}</p>
      <p v-if="latitude !== null && longitude !== null">Longitude: {{ longitude }}</p>
      <div v-if="latitude !== null && longitude !== null" id="map"></div>
      <p v-else>La localisation n'est pas disponible. Veuillez autoriser l'accès à votre position.</p>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    data() {
      return {
        latitude: null,
        longitude: null,
        errorMessage: null
      };
    },
    methods: {
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.$nextTick(() => {
                this.showMap();
              });
            },
            error => {
              this.handleLocationError(error);
            }
          );
        } else {
          this.errorMessage = "La géolocalisation n'est pas prise en charge par votre navigateur.";
          console.error(this.errorMessage);
        }
      },
      handleLocationError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.errorMessage = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
          case error.POSITION_UNAVAILABLE:
            this.errorMessage = "Les informations de localisation ne sont pas disponibles.";
            break;
          case error.TIMEOUT:
            this.errorMessage = "La demande de localisation a expiré.";
            break;
          case error.UNKNOWN_ERROR:
            this.errorMessage = "Une erreur inconnue s'est produite.";
            break;
        }
        console.error(this.errorMessage);
      },
      showMap() {
        if (this.latitude && this.longitude) {
          const map = L.map('map').setView([this.latitude, this.longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          L.marker([this.latitude, this.longitude]).addTo(map)
            .bindPopup('Tu es ici chef !')
            .openPopup();
        }
      }
    },
    mounted() {
      this.getLocation();
    }
  };
  </script>
  
  <style>
  #map {
    width: 50%;
    height: 400px;
    margin: 0 auto;
  }
  </style>
  