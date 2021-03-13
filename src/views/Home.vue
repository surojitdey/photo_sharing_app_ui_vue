<template>
  <div class="home">
    <v-file-input
      accept="image/*"
      label="File input"
      v-model="image"
    ></v-file-input>
    <v-btn tile color="primary" @click="uploadImage(image)">Upload</v-btn>
    <v-row justify="space-around">
      <v-col cols="4">
        <Users :users="users" :followings="followings" class="py-3"></Users>
      </v-col>
      <v-col cols="5">
        <Post 
          class="py-3"
          :posts="posts"
        >
        </Post>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
import Post from '@/components/Post'
import Users from '@/components/Users'

export default {
  name: 'Home',
  components: {
    Post,
    Users
  },
  data: () => ({
    image: undefined
  }),
  computed: {
    ...mapGetters('user',{
      user: 'getUser',
      users: 'getUsers',
      posts: 'getPosts',
      followings: 'getFollowers'
    }),
    ...mapGetters('JWT',[
      'loggedIn',
      'access_token'
    ])
  },
  methods: {
    ...mapActions('user', [
      'fetchUser',
      'fetchUsers',
      'postPhoto',
      'fetchPosts',
      'fetchFollowers'
    ]),
    uploadImage(image) {
      let formData = new FormData()
      formData.append('user', this.user.id)
      formData.append('media_file', image)
      this.postPhoto(formData)
    }
  },
  mounted() {
    if(this.loggedIn && this.access_token) {
      this.fetchUser()
      this.fetchUsers()
      this.fetchPosts()
      this.fetchFollowers()
    }
  }
}
</script>

<style scoped>

</style>
