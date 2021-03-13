<template> 
  <v-container fluid class="signin">
    <v-card color="grey lighten-2" class="py-16 my-16" width="81%">
      <v-card-text v-if="showError" class="red--text px-7">Wrong credentials.</v-card-text>
      <v-form v-model="formValid">
        <v-row justify="start">
          <v-col cols="7" class="px-10">
            <span class="text-h5 font-weight-bold">Sign In</span>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model.trim="$v.signinData.email.$model"
              label="Email"
            ></v-text-field>
            <span v-if="!$v.signinData.email.required" class="red--text text-body-2">Email required.</span>
            <span v-if="!$v.signinData.email.email" class="red--text text-body-2">Invalid email.</span>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model="$v.signinData.password.$model"
              label="Password"
            ></v-text-field>
            <span v-if="!$v.signinData.password.required" class="red--text text-body-2">Password required.</span>
            <span v-if="!$v.signinData.password.minLength" class="red--text text-body-2">Password must be atleast 8 charecter long.</span>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="px-7">
        <v-btn class="primary" @click="signinFunction">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    signinData: {
      email: '',
      password: ''
    },
    formValid: false,
    showError: false
  }),

  validations() {
    let data = {
      signinData: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    }
    return data
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions('JWT', [
      'fetchJWT'
    ]),
    signinFunction() {
      this.fetchJWT({formData: this.signinData})
      .then(() => {
        this.formValid = true
        this.showError = false
        this.$router.push('/')
      })
      .catch(() => {
        this.formValid = false
        this.showError = true
      })
    }
  }
}
</script>

<style scoped>
.signin {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
