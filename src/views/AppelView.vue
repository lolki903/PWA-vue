<template>
    <div class="dialer">
      <div class="display">
        <div class="number">{{ dialedNumber }}</div>
      </div>
      <div class="buttons">
        <div v-for="number in numbers" :key="number" @click="appendNumber(number)" class="button">
          {{ number }}
        </div>
      </div>
      <div class="action-buttons">
        <button @click="call" class="call-button">Appeler</button>
        <button @click="deleteLastNumber" class="delete-button">Effacer</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        dialedNumber: ''
      };
    },
    methods: {
      appendNumber(number) {
        if (this.dialedNumber.length < 10) {
          this.dialedNumber += number;
        }
      },
      deleteLastNumber() {
        if (this.dialedNumber.length > 0) {
          this.dialedNumber = this.dialedNumber.slice(0, -1);
        }
      },
      call() {
        if (this.dialedNumber.length === 10) {
          window.location.href = `tel:${this.dialedNumber}`;
          console.log("Appel en cours vers le numéro :", this.dialedNumber);
        } else {
          console.log("Le numéro doit comporter 10 chiffres.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dialer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .display {
    margin-bottom: 20px;
    font-size: 24px;
    border: 1px solid black;
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  
  .buttons {
    display: flex;
    flex-wrap: wrap;
    width: 150px;
    justify-content: space-between;
  }
  
  .button {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 2px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #ccc;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    width: 150px;
    margin-top: 20px;
  }
  
  .call-button, .delete-button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .call-button {
    background-color: #42b983;
  }
  
  .call-button:hover {
    background-color: #333;
  }
  
  .delete-button {
    background-color: #e74c3c;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  </style>
  