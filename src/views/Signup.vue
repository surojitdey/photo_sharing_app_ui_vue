<template> 
  <v-container fluid class="signup">
    <v-card color="grey lighten-2" class="py-16 my-16" width="81%">
      <v-form v-model="formValid">
        <v-row justify="start">
          <v-col cols="7" class="px-10">
            <span class="text-h5 font-weight-bold">Sign In Info</span>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model.trim="$v.primaryData.email.$model"
              label="Email"
            ></v-text-field>
            <span v-if="!$v.primaryData.email.required" class="red--text text-body-2">Email required.</span>
            <span v-if="!$v.primaryData.email.email" class="red--text text-body-2">Invalid email.</span>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model="$v.primaryData.password.$model"
              label="Password"
            ></v-text-field>
            <span v-if="!$v.primaryData.password.required" class="red--text text-body-2">Password required.</span>
            <span v-if="!$v.primaryData.password.minLength" class="red--text text-body-2">Password must be atleast 8 charecter long.</span>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model="$v.primaryData.confirmPassword.$model"
              label="Confirm Password"
            ></v-text-field>
            <span v-if="!$v.primaryData.confirmPassword.required" class="red--text text-body-2">Confirm Password required.</span>
            <span v-if="!$v.primaryData.confirmPassword.sameAsPassword" class="red--text text-body-2">Confirm Password must be as Password.</span>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model="$v.primaryData.first_name.$model"
              label="First Name"
            ></v-text-field>
            <span v-if="!$v.primaryData.first_name.required" class="red--text text-body-2">First name required.</span>
          </v-col>
          <v-col cols="7" class="px-10">
            <v-text-field 
              v-model="$v.primaryData.last_name.$model"
              label="Last Name"
            ></v-text-field>
            <span v-if="!$v.primaryData.last_name.required" class="red--text text-body-2">Last name required.</span>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="px-7">
        <v-btn @click="signup" class="primary">Sign Up</v-btn>
        <v-btn>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    primaryData: {
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      role: 'user'
    },
    formValid: false,
    rules: {
      phoneNumber: val => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val) || /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val)) || 'Phone Number Must be valid',
    },
    relationItems: [
      {
        name: 'Husband',
        value: 'husband'
      },
      {
        name: 'Wife',
        value: 'wife'
      },
      {
        name: 'Father',
        value: 'father'
      },
      {
        name: 'Mother',
        value: 'mother'
      },
      {
        name: 'Son',
        value: 'son'
      },
      {
        name: 'Daughter',
        value: 'daughter'
      },
      {
        name: 'Other',
        value: 'other'
      },
    ],
    familyData: []
  }),

  validations() {
    let data = {
      primaryData: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs('password')
        },
        first_name: {
          required
        },
        last_name: {
          required
        }
      }
    }
    return data
  },
  computed: {
    ...mapGetters([])
  },
  watch: {

  },
  methods: {
    ...mapMutations([]),
    ...mapActions('user', [
      'signupUser'
    ]),
    signup() {
      this.signupUser({formData: this.primaryData})
    }
  }
}
</script>

<style scoped>
.signup {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
