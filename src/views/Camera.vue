<template>
  <div class="camera-view">
    <video ref="videoElement" autoplay></video>
    <button @click="takePhoto">Prendre une photo</button>
    <canvas ref="canvasElement" style="display: none;"></canvas>
    <div>
      <h3>Photos :</h3>
      <ul>
        <li v-for="(photo, index) in lastThreePhotos" :key="photo.id" class="photo-item">
          <div class="photo-container">
            <img :src="photo.url" :alt="'Photo ' + index" :class="photo.isOnline ? 'online' : 'offline'">
            <button class="delete-button" @click="removePhoto(photo.id)">×</button>
          </div>
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
      photos: [],
      isOnline: navigator.onLine
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
        if ('showNotification' in registration) {
          registration.showNotification(title, payload);
        } else {
          new Notification(title, payload);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Notification de la caméra', {
              body: message,
            });
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
      const photoId = Date.now().toString();
      const photo = { id: photoId, url: photoData, isOnline: this.isOnline };
      this.photos.push(photo);
      this.notify('Photo capturée avec succès!');
      this.storePhoto(photo);
    },
    storePhoto(photo) {
      const photos = JSON.parse(localStorage.getItem('photos')) || [];
      photos.push(photo);
      localStorage.setItem('photos', JSON.stringify(photos));
      this.$store.dispatch('addPhoto', photo);
    },
    loadPhotos() {
      const photos = JSON.parse(localStorage.getItem('photos')) || [];
      this.photos = photos;
      // Synchroniser avec le store Vuex
      photos.forEach(photo => {
        this.$store.dispatch('addPhoto', photo);
      });
    },
    removePhoto(id) {
      this.photos = this.photos.filter(photo => photo.id !== id);
      localStorage.setItem('photos', JSON.stringify(this.photos));
      this.$store.dispatch('removePhoto', id);
    },
    async updateOnlineStatus() {
      this.isOnline = navigator.onLine;
      if (this.isOnline) {
        // Mettre à jour les photos pour marquer celles qui étaient hors ligne comme maintenant en ligne
        this.photos.forEach(photo => {
          if (!photo.isOnline) {
            photo.isOnline = true;
          }
        });
        localStorage.setItem('photos', JSON.stringify(this.photos));
        this.$store.dispatch('updatePhotos', this.photos);
        await this.notify('Synchronisation des images effectuée !');
        alert('Synchronisation des images effectuée !');
      }
    }
  },
  mounted() {
    this.getCameraStream();
    this.loadPhotos(); // Charger les photos depuis le localStorage lors du montage
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
};
</script>

<style scoped>
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

.photo-item {
  position: relative;
}

.photo-container {
  position: relative;
  display: inline-block;
}

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.delete-button:hover {
  background: darkred;
}

.online {
  border: 2px solid green;
}

.offline {
  border: 2px solid red;
}
</style>
