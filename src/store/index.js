// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    photos: []
  },
  mutations: {
    addPhoto(state, photo) {
      if (!state.photos.find(p => p.id === photo.id)) {
        state.photos.push(photo);
      }
    },
    removePhoto(state, photoId) {
      state.photos = state.photos.filter(photo => photo.id !== photoId);
    },
    updatePhotos(state, photos) {
      state.photos = photos;
    },
    setPhotos(state, photos) { // Ajout de cette mutation
      state.photos = photos;
    }
  },
  actions: {
    addPhoto({ commit }, photo) {
      commit('addPhoto', photo);
    },
    removePhoto({ commit }, photoId) {
      commit('removePhoto', photoId);
    },
    updatePhotos({ commit }, photos) {
      commit('updatePhotos', photos);
    },
    loadPhotos({ commit }) {
      const photos = JSON.parse(localStorage.getItem('photos')) || [];
      commit('setPhotos', photos);
    }
  },
  getters: {
    lastThreePhotos(state) {
      return state.photos.slice(-3);
    },
    allPhotos(state) {
      return state.photos;
    }
  }
});
