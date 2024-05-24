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
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'],
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
      if (this.dialedNumber.length > 0) {
        window.location.href = `tel:${this.dialedNumber}`;
        console.log("Appel en cours vers le numéro :", this.dialedNumber);
      } else {
        console.log("Veuillez entrer un numéro.");
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
  padding: 20px;
  font-family: Arial, sans-serif;
}

.display {
  margin-bottom: 20px;
  font-size: 24px;
  border: 1px solid #ccc;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.number {
  font-size: 24px;
  font-weight: bold;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.button {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.call-button, .delete-button {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.call-button {
  background-color: #42b983;
}

.call-button:hover {
  background-color: #3a9e72;
  transform: scale(1.05);
}

.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}
</style>
