<template>
    <div class="vibrate-container">
      <button @click="vibrateDevice" class="vibrate-button">Vibrer</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VibrateButton',
    methods: {
      vibrateDevice() {
        if (navigator.vibrate) {
          navigator.vibrate(200); // Fait vibrer l'appareil pendant 200 millisecondes
        } else {
          alert("Votre appareil ne supporte pas l'API Vibration.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .vibrate-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .vibrate-button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .vibrate-button:hover {
    background-color: #333;
    transform: scale(1.05);
  }
  </style>
  