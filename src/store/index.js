import Vue from 'vue'
import Vuex from 'vuex'

import JWT from './modules/JWT'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    JWT,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
