import Vue from 'vue'
import ApiService from '../../services/api.service'
import _ from 'lodash'
import router from '@/router'

const state = {
  user: {},
  users: [],
  posts: [],
  likes: {},
  followers: []
}

const mutations = {
  setUser(state, user) {
    Vue.set(state, 'user', {...user})
  },
  setUsers(state, users) {
    Vue.set(state, 'users', [...users])
  },
  setPosts(state, posts) {
    Vue.set(state, 'posts', [...posts])
  },
  setLikes(state, { index, responseData}) {
    Vue.set(state.likes, index, responseData.length)
  },
  setFollowers(state, followers) {
    Vue.set(state, 'followers', [...followers])
  }
}

const actions = {
  // create user for everyone.
  signupUser({state, getters}, {formData} ) {
    console.log('data', state, getters)
    ApiService.post('/user-api/v-1/user/', _.omit(formData, 'confirmPassword'))
    .then(() => {
      router.push('signin')
    })
  },

  fetchUser({commit}) {
    return ApiService.get('/user-api/v-1/get-user/').then((response) => {
      commit('setUser', response.data)
    })
  },

  fetchUsers({commit}) {
    return ApiService.get('/user-api/v-1/user/').then((response) => {
      commit('setUsers', response.data)
    })
  },

  followUser({ state, getters, dispatch }, { follower }) {
    console.log('afs', getters)
    return ApiService.post('/follower-api/v-1/user-follower/', { user: state.user[0].id, follower: [follower] }).then(() => {
      dispatch('fetchFollowers')
    })
  },

  fetchFollowers({commit}) {
    ApiService.get('/follower-api/v-1/user-follower/').then((response) => {
      commit('setFollowers', response.data)
    })
  },

  postPhoto({ state, getters, dispatch }, formData) {
    console.log('sfasf', state, getters)
    return ApiService.post("/posts-api/v-1/post/", formData).then(() => {
      dispatch('fetchPosts')
    }).catch((error) => {
      console.log('error', error)
    })
  },

  fetchPosts({commit}) {
    return ApiService.get('/posts-api/v-1/post/').then((response) => {
      commit('setPosts', response.data)
    })
  },

  fetchLikeDetails({commit}, data) {
    return ApiService.get(`/posts-api/v-1/like/?pid=${data[0]}`).then((response) => {
      let responseData = response.data
      let index = data[1]
      commit('setLikes', { index, responseData })
    })
  },

  likePhoto({dispatch}, data) {
    return ApiService.post('/posts-api/v-1/like/', { post: data[0]}).then(() => {
      dispatch('fetchLikeDetails', data)
    })
  },

  fetchCommentDetails({ commit }, pid) {
    return ApiService.get(`/posts-api/v-1/comment/?pid=${pid}`).then((response) => {
      commit('setLikes', response.data)
    })
  },
}

const getters = {
  getUser: state => state.user,
  getUsers: state => state.users,
  getPosts: state => state.posts,
  getLike: state => state.likes,
  getFollowers: state => state.followers
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
