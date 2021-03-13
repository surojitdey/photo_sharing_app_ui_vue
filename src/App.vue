<template>
  <v-app>
    <v-main class="wraper-class">
      <Navbar></Navbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  computed: {
    
  }
};
</script>

<style scoped>
.wraper-class {
  padding: 64px 0px 0px 0px !important;
}
</style>
