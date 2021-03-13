<template>
  <div class="users">
    <v-card class="" max-width="200" v-for="(user, index) in users" :key="index" dark>
      <v-img
        class="elevation-6"
        alt=""
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      ></v-img>
      <v-card-title>{{user.first_name}} {{user.last_name}}</v-card-title>
      <v-card-actions>
        <v-btn class="primary" v-if="!following(user.id)" @click="follow(user.id)">Follow</v-btn>
        <v-btn class="primary" v-else @click="unfollow(user.id)">Unfollow</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props:[
    'users',
    'followings'
  ],
  data: () => ({

  }),
  computed: {
    ...mapGetters('user',{
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions('user',[
      'followUser',
    ]),
    follow(followUserId) {
      this.followUser({follower: followUserId}).then((response) => {
        console.log('response', response)
      })
    },
    unfollow(unfollowUserId) {
      console.log('Unfollowed', unfollowUserId)
    },
    following(id) {
      return this.followings.some((following) => {
        return following.follower[0] == id
      })
    },
  }
}
</script>
