<template>
    <div class="battery-status">
      <h3>Batterie</h3>
      <p>{{ batteryLevel }}%</p>
      <div class="battery-bar">
        <div class="battery-fill" :style="{ width: batteryLevel + '%' }"></div>
      </div>
      <div v-if="isCharging" class="charging-indicator"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        batteryLevel: 0,
        isCharging: false // État de charge de la batterie
      };
    },
    methods: {
      updateBatteryStatus(battery) {
        this.batteryLevel = Math.round(battery.level * 100);
        this.isCharging = battery.charging;
      }
    },
    mounted() {
      if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
          this.updateBatteryStatus(battery);
  
          battery.addEventListener('levelchange', () => {
            this.updateBatteryStatus(battery);
          });
          
          battery.addEventListener('chargingchange', () => {
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
  
  .battery-bar {
    width: 100%;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
  }
  
  .battery-fill {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease;
  }
  
  .charging-indicator {
    width: 20px;
    height: 20px;
    background-color: #42b983;
    border-radius: 50%;
    margin-top: 10px;
    animation: pulse 1s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  