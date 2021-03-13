<template>
  <div class="post">
    <v-card class="mx-auto my-3" max-width="400" dark v-for="(post, index) in posts" :key="index">
      <v-img
        class="white--text align-end"
        height="200"
        :src="post.media_file"
        @load="fetchLike(post.id, index)"
      >
      </v-img>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user[0].first_name}} {{user[0].last_name}}</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <v-btn icon @click="liked(post.id, index)">
              <v-img :src="likeIcon" class="svg-icon" width="28" height="24"></v-img>
            </v-btn>
            <span class="subheading mr-2">{{likes[index]}}</span>
            <span class="mr-1"></span>
            <v-btn icon>
              <v-icon>mdi-comment</v-icon>
            </v-btn>
            <span class="subheading">0</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import likeIcon from '@/assets/thumb_up_alt.svg'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: [
    'posts'
  ],
  data: () => ({
    likeIcon
  }),
  computed: {
    ...mapGetters('user', {
      likes: 'getLike',
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions('user', [
      'fetchLikeDetails',
      'likePhoto',
      'fetchUser'
    ]),
    fetchLike(pid, index) {
      this.fetchLikeDetails([pid, index])
    },
    liked(pid, index) {
      this.likePhoto([pid, index])
    }
  },
  mounted() {
    this.fetchUser().then(() => {
      console.log('post user', this.user)
    })
  }
}
</script>
<style scoped>
.svg-icon {
  filter: invert(1);
}
.svg-icon >>> .v-image__image {
  width: 28px;
  height: 23px;
}
</style>
