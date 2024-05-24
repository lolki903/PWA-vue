<template>
  <div class="hello">

    <h1>BIENVENUE !</h1>
    <img src="../assets/qrcode.png" alt="QR Code">
    <div class="navigation">
      <router-link to="/camera" class="button">Camera</router-link>
      <router-link to="/stockage" class="button">Stockage</router-link>
      <router-link to="/appel" class="button">Appel</router-link>
      <router-link to="/about" class="button">About</router-link>
      <router-link to="/position" class="button">Position</router-link>
      <router-link to="/batterie" class="button">Batterie</router-link>
      <router-link to="/vibreur" class="button">Vibreur</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style>
.hello {
  text-align: center;
  margin-top: 50px;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navigation .button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.navigation .button:hover {
  background-color: #333;
}
</style>
