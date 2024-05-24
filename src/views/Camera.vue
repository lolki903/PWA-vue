<template>
  <div class="camera-view">
    <video ref="videoElement" autoplay></video>
    <button @click="takePhoto">Prendre une photo</button>
    <canvas ref="canvasElement" style="display: none;"></canvas>
    <div>
      <h3>Photos :</h3>
      <ul>
        <li v-for="(photo, index) in lastThreePhotos" :key="index">
          <img :src="photo.url" :alt="'Photo ' + index">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraView',
  data() {
    return {
      photos: []
    };
  },
  computed: {
    lastThreePhotos() {
      return this.photos.slice(-3).reverse(); // Afficher les 3 dernières photos dans l'ordre inverse
    }
  },
  methods: {
    async getCameraStream() {
      const constraints = {
        video: true,
        audio: false // Pas besoin d'audio pour prendre des photos
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.videoElement.srcObject = stream;
      } catch (error) {
        console.error('Error accessing the camera:', error);
        alert('Failed to access the camera. Please check your device settings.');
      }
    },
    async notify(message) {
      const registration = await navigator.serviceWorker.getRegistration();
      const title = 'Notification de la caméra';
      const payload = {
        body: message,
      };
      if (Notification.permission === 'granted') {
        // new Notification('Notification de la caméra', {
        //   body: message,
        // });
        if('showNotification' in registration) {
          registration.showNotification(title, payload);
        }
        else {
          new Notification(title, payload);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Notification de la caméra', 
            {
              body: message,});
          } else {
            console.warn('Notification permission denied');
          }
        }).catch(error => {
          console.error('Error requesting notification permission', error);
        });
      } else {
        console.warn('Notification permission denied');
      }
    },
    takePhoto() {
      const canvas = this.$refs.canvasElement;
      const video = this.$refs.videoElement;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const photoData = canvas.toDataURL('image/png');
      this.photos.push({ url: photoData });
      debugger;
      this.notify('Photo capturée avec succès!');
      console.log('Photo data:', photoData);
      this.storePhoto(photoData);
    },
    storePhoto(photoData) {
      // Exemple de stockage des photos dans le localStorage
      this.$store.dispatch('addPhoto', { url: photoData, timestamp: new Date().toISOString() });
      localStorage.setItem('photo_' + Date.now(), photoData);
    }
  },
  mounted() {
    this.getCameraStream();
  }
};
</script>

<style>
.camera-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.camera-view video {
  width: 50%;
  border: 1px solid black;
}

.camera-view img {
  width: 100px;
  height: auto;
  margin: 10px;
}

.camera-view button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.camera-view button:hover {
  background-color: #333;
}
</style>
