<template>
    <div class="battery-status">
      <h3>Batterie</h3>
      <p>{{ batteryLevel }}%</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        batteryLevel: 0
      };
    },
    methods: {
      updateBatteryStatus(battery) {
        this.batteryLevel = Math.round(battery.level * 100);
      }
    },
    mounted() {
      if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
          this.updateBatteryStatus(battery);
  
          battery.addEventListener('levelchange', () => {
            this.updateBatteryStatus(battery);
          });
        });
      } else {
        console.warn("L'API Battery Status n'est pas supportée par ce navigateur.");
      }
    }
  };
  </script>
  
  <style scoped>
  .battery-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 200px;
    margin: auto;
  }
  
  .battery-status h3 {
    margin: 0;
    margin-bottom: 10px;
  }
  
  .battery-status p {
    font-size: 24px;
    margin: 0;
  }
  </style>
  