// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    photos: []
  },
  mutations: {
    addPhoto(state, photo) {
      state.photos.push(photo);
    }
  },
  actions: {
    addPhoto({ commit }, photo) {
      commit('addPhoto', photo);
    }
  },
  getters: {
    lastThreePhotos(state) {
      return state.photos.slice(-3);
    }
  }
});
