import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'



Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    IsUserAuthenticated: true,
    token: "",
  },
  mutations: {
    login(state, token) {
      state.IsUserAuthenticated = true;
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    },
    logout(state) {
      state.IsUserAuthenticated = false;
      state.token = '';
      axios.defaults.headers.common['Authorization'] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("savedSelectedCities");
    }
  },
  actions: {
    onStart(context) {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        context.commit('login', token);
      } else {
        context.commit('logout');
      }
    }
  },
  modules: {
  }
});
